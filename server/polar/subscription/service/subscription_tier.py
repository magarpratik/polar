import uuid
from collections.abc import Sequence
from typing import Any

from sqlalchemy import ColumnExpressionArgument, Select, or_, select
from sqlalchemy.exc import InvalidRequestError
from sqlalchemy.orm import aliased, contains_eager

from polar.account.service import account as account_service
from polar.auth.dependencies import AuthMethod
from polar.authz.service import AccessType, Authz, Subject
from polar.exceptions import NotPermitted, PolarError
from polar.integrations.stripe.service import StripeError
from polar.integrations.stripe.service import stripe as stripe_service
from polar.kit.db.postgres import AsyncSession
from polar.kit.pagination import PaginationParams, paginate
from polar.kit.services import ResourceService
from polar.models import (
    Account,
    Organization,
    Repository,
    SubscriptionTier,
    User,
    UserOrganization,
)
from polar.organization.service import organization as organization_service
from polar.repository.service import repository as repository_service

from ..schemas import SubscribeSession, SubscriptionTierCreate, SubscriptionTierUpdate


class SubscriptionTierError(PolarError):
    ...


class OrganizationDoesNotExist(SubscriptionTierError):
    def __init__(self, organization_id: uuid.UUID) -> None:
        self.organization_id = organization_id
        message = f"Organization with id {organization_id} does not exist."
        super().__init__(message, 422)


class RepositoryDoesNotExist(SubscriptionTierError):
    def __init__(self, organization_id: uuid.UUID) -> None:
        self.organization_id = organization_id
        message = f"Repository with id {organization_id} does not exist."
        super().__init__(message, 422)


class ArchivedSubscriptionTier(SubscriptionTierError):
    def __init__(self, subscription_tier_id: uuid.UUID) -> None:
        self.subscription_tier_id = subscription_tier_id
        message = "This subscription tier is archived."
        super().__init__(message, 404)


class NotAddedToStripeSubscriptionTier(SubscriptionTierError):
    def __init__(self, subscription_tier_id: uuid.UUID) -> None:
        self.subscription_tier_id = subscription_tier_id
        message = "This subscription tier has not beed synced with Stripe."
        super().__init__(message, 500)


class NoAssociatedPayoutAccount(SubscriptionTierError):
    def __init__(self, organization_id: uuid.UUID) -> None:
        self.organization = organization_id
        message = (
            "A payout account should be configured for this organization "
            "before being able to accept subscriptions."
        )
        super().__init__(message, 400)


class SubscriptionTierService(
    ResourceService[SubscriptionTier, SubscriptionTierCreate, SubscriptionTierUpdate]
):
    async def search(
        self,
        session: AsyncSession,
        auth_subject: Subject,
        *,
        organization: Organization | None = None,
        repository: Repository | None = None,
        direct_organization: bool = True,
        pagination: PaginationParams,
    ) -> tuple[Sequence[SubscriptionTier], int]:
        statement = self._get_readable_subscription_tier_statement(auth_subject)

        if organization is not None:
            clauses = [SubscriptionTier.organization_id == organization.id]
            if not direct_organization:
                clauses.append(Repository.organization_id == organization.id)
            statement = statement.where(or_(*clauses))

        if repository is not None:
            statement = statement.where(SubscriptionTier.repository_id == repository.id)

        statement = statement.order_by(
            SubscriptionTier.price_amount,
        )

        results, count = await paginate(session, statement, pagination=pagination)

        return results, count

    async def get_by_id(
        self, session: AsyncSession, auth_subject: Subject, id: uuid.UUID
    ) -> SubscriptionTier | None:
        statement = (
            self._get_readable_subscription_tier_statement(auth_subject)
            .where(SubscriptionTier.id == id, SubscriptionTier.deleted_at.is_(None))
            .options(
                contains_eager(SubscriptionTier.organization),
                contains_eager(SubscriptionTier.repository),
            )
        )

        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def get_by_stripe_product_id(
        self, session: AsyncSession, stripe_product_id: str
    ) -> SubscriptionTier | None:
        return await self.get_by(session, stripe_product_id=stripe_product_id)

    async def user_create(
        self,
        session: AsyncSession,
        authz: Authz,
        create_schema: SubscriptionTierCreate,
        user: User,
    ) -> SubscriptionTier:
        organization: Organization | None = None
        repository: Repository | None = None
        if create_schema.organization_id is not None:
            organization = await organization_service.get(
                session, create_schema.organization_id
            )
            if organization is None or not await authz.can(
                user, AccessType.write, organization
            ):
                raise OrganizationDoesNotExist(create_schema.organization_id)

        if create_schema.repository_id is not None:
            repository = await repository_service.get(
                session, create_schema.repository_id
            )
            if repository is None or not await authz.can(
                user, AccessType.write, repository
            ):
                raise RepositoryDoesNotExist(create_schema.repository_id)

        nested = await session.begin_nested()
        subscription_tier = await self.model.create(
            session, **create_schema.dict(), autocommit=False
        )
        await session.flush()
        assert subscription_tier.id is not None

        try:
            product = stripe_service.create_product_with_price(
                create_schema.name,
                price_amount=create_schema.price_amount,
                price_currency=create_schema.price_currency,
                description=create_schema.description,
                metadata={
                    "subscription_tier_id": str(subscription_tier.id),
                    "organization_id": str(subscription_tier.organization_id),
                    "organization_name": organization.name
                    if organization is not None
                    else None,
                    "repository_id": str(subscription_tier.repository_id),
                    "repository_name": repository.name
                    if repository is not None
                    else None,
                },
            )
        except StripeError:
            await nested.rollback()
            raise

        subscription_tier.stripe_product_id = product.stripe_id
        subscription_tier.stripe_price_id = product.default_price

        await session.commit()
        return subscription_tier

    async def user_update(
        self,
        session: AsyncSession,
        authz: Authz,
        subscription_tier: SubscriptionTier,
        update_schema: SubscriptionTierUpdate,
        user: User,
    ) -> SubscriptionTier:
        subscription_tier = await self._with_organization_or_repository(
            session, subscription_tier
        )

        if not await authz.can(user, AccessType.write, subscription_tier):
            raise NotPermitted()

        if (
            update_schema.price_amount is not None
            and subscription_tier.stripe_product_id is not None
            and subscription_tier.stripe_price_id is not None
            and update_schema.price_amount != subscription_tier.price_amount
        ):
            new_price = stripe_service.create_price_for_product(
                subscription_tier.stripe_product_id,
                update_schema.price_amount,
                subscription_tier.price_currency,
                set_default=True,
            )
            stripe_service.archive_price(subscription_tier.stripe_price_id)
            subscription_tier.stripe_price_id = new_price.stripe_id

        return await subscription_tier.update(
            session, **update_schema.dict(exclude_unset=True)
        )

    async def archive(
        self,
        session: AsyncSession,
        authz: Authz,
        subscription_tier: SubscriptionTier,
        user: User,
    ) -> SubscriptionTier:
        subscription_tier = await self._with_organization_or_repository(
            session, subscription_tier
        )
        if not await authz.can(user, AccessType.write, subscription_tier):
            raise NotPermitted()

        if subscription_tier.stripe_product_id is not None:
            stripe_service.archive_product(subscription_tier.stripe_product_id)

        return await subscription_tier.update(session, is_archived=True)

    async def create_subscribe_session(
        self,
        session: AsyncSession,
        subscription_tier: SubscriptionTier,
        success_url: str,
        auth_subject: Subject,
        auth_method: AuthMethod | None,
        *,
        customer_email: str | None = None,
    ) -> SubscribeSession:
        if subscription_tier.is_archived:
            raise ArchivedSubscriptionTier(subscription_tier.id)

        if subscription_tier.stripe_price_id is None:
            raise NotAddedToStripeSubscriptionTier(subscription_tier.id)

        account = await self._get_managing_organization_account(
            session, subscription_tier
        )
        if account is None:
            raise NoAssociatedPayoutAccount(subscription_tier.managing_organization_id)

        customer_options: dict[str, str] = {}
        # Set the customer only from a cookie-based authentication!
        # With the PAT, it's probably a call from the maintainer who wants to redirect
        # the backer they bring from their own website.
        if (
            auth_method == AuthMethod.COOKIE
            and isinstance(auth_subject, User)
            and auth_subject.stripe_customer_id is not None
        ):
            customer_options["customer"] = auth_subject.stripe_customer_id
        elif customer_email is not None:
            customer_options["customer_email"] = customer_email

        metadata: dict[str, str] = {"subscription_tier_id": str(subscription_tier.id)}

        checkout_session = stripe_service.create_subscription_checkout_session(
            subscription_tier.stripe_price_id,
            success_url,
            **customer_options,
            metadata=metadata,
        )

        return SubscribeSession(
            id=checkout_session.stripe_id,
            url=checkout_session.url,
            customer_email=checkout_session.customer_details["email"]
            if checkout_session.customer_details
            else checkout_session.customer_email,
            customer_name=checkout_session.customer_details["name"]
            if checkout_session.customer_details
            else None,
            subscription_tier=subscription_tier,  # type: ignore
        )

    async def get_subscribe_session(
        self, session: AsyncSession, id: str
    ) -> SubscribeSession:
        checkout_session = stripe_service.get_checkout_session(id)

        subscription_tier_id = checkout_session.metadata["subscription_tier_id"]
        subscription_tier = await self.get(session, uuid.UUID(subscription_tier_id))
        assert subscription_tier is not None

        return SubscribeSession(
            id=checkout_session.stripe_id,
            url=checkout_session.url,
            customer_email=checkout_session.customer_details["email"]
            if checkout_session.customer_details
            else checkout_session.customer_email,
            customer_name=checkout_session.customer_details["name"]
            if checkout_session.customer_details
            else None,
            subscription_tier=subscription_tier,  # type: ignore
        )

    async def _with_organization_or_repository(
        self, session: AsyncSession, subscription_tier: SubscriptionTier
    ) -> SubscriptionTier:
        try:
            subscription_tier.organization
            subscription_tier.repository
        except InvalidRequestError:
            await session.refresh(subscription_tier, {"organization", "repository"})
        return subscription_tier

    def _get_readable_subscription_tier_statement(
        self, auth_subject: Subject
    ) -> Select[Any]:
        clauses: list[ColumnExpressionArgument[bool]] = [
            SubscriptionTier.repository_id.is_(None),
            Repository.is_private.is_(False),
        ]
        if isinstance(auth_subject, User):
            clauses.append(UserOrganization.user_id == auth_subject.id)

        RepositoryOrganization = aliased(Organization)

        return (
            select(SubscriptionTier)
            .join(SubscriptionTier.organization, full=True)
            .join(SubscriptionTier.repository, full=True)
            .join(
                RepositoryOrganization,
                onclause=RepositoryOrganization.id == Repository.organization_id,
                full=True,
            )
            .join(
                UserOrganization,
                onclause=UserOrganization.organization_id == RepositoryOrganization.id,
                full=True,
            )
            .where(SubscriptionTier.deleted_at.is_(None), or_(*clauses))
        )

    async def _get_managing_organization_account(
        self, session: AsyncSession, subscription_tier: SubscriptionTier
    ) -> Account | None:
        return await account_service.get_by_org(
            session, subscription_tier.managing_organization_id
        )


subscription_tier = SubscriptionTierService(SubscriptionTier)
