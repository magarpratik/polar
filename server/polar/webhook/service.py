from collections.abc import Sequence
from enum import Enum
from typing import Literal, Union
from uuid import UUID

from sqlalchemy import desc
from sqlalchemy.orm import joinedload

from polar.kit.db.postgres import AsyncSession
from polar.kit.extensions.sqlalchemy import sql
from polar.kit.pagination import PaginationParams, paginate
from polar.kit.schemas import Schema
from polar.models.organization import Organization
from polar.models.subscription import Subscription
from polar.models.subscription_tier import SubscriptionTier
from polar.models.user import User
from polar.models.webhook_delivery import WebhookDelivery
from polar.models.webhook_endpoint import WebhookEndpoint
from polar.models.webhook_event import WebhookEvent
from polar.subscription.schemas import Subscription as SubscriptionSchema
from polar.subscription.schemas import SubscriptionTier as SubscriptionTierSchema
from polar.worker import enqueue_job


class WebhookEventType(Enum):
    subscription_created = "subscription.created"
    subscription_updated = "subscription.updated"
    subscription_tier_created = "subscription_tier.created"
    subscription_tier_updated = "subscription_tier.updated"
    benefit_created = "benefit.created"
    benefit_updated = "benefit.updated"
    organization_updated = "organization.updated"
    pledge_created = "pledge.created"
    donation_created = "donation.created"


WebhookTypeObject = Union[  # noqa: UP007
    tuple[Literal[WebhookEventType.subscription_created], Subscription],
    tuple[Literal[WebhookEventType.subscription_updated], Subscription],
    tuple[Literal[WebhookEventType.subscription_tier_created], SubscriptionTier],
    tuple[Literal[WebhookEventType.subscription_tier_updated], SubscriptionTier],
]


class WebhookSubscriptionCreatedPayload(Schema):
    type: Literal[WebhookEventType.subscription_created]
    data: SubscriptionSchema


class WebhookSubscriptionUpdatedPayload(Schema):
    type: Literal[WebhookEventType.subscription_updated]
    data: SubscriptionSchema


class WebhookSubscriptionTierCreatedPayload(Schema):
    type: Literal[WebhookEventType.subscription_tier_created]
    data: SubscriptionTierSchema


class WebhookSubscriptionTierUpdatedPayload(Schema):
    type: Literal[WebhookEventType.subscription_tier_updated]
    data: SubscriptionTierSchema


WebhookPayload = Union[  # noqa: UP007
    WebhookSubscriptionCreatedPayload,
    WebhookSubscriptionUpdatedPayload,
    WebhookSubscriptionTierCreatedPayload,
    WebhookSubscriptionTierUpdatedPayload,
]


class WebhookService:
    async def list_endpoints(
        self, session: AsyncSession, target: Organization | User
    ) -> Sequence[WebhookEndpoint]:
        stmt = sql.select(WebhookEndpoint)

        if isinstance(target, Organization):
            stmt = stmt.where(WebhookEndpoint.organization_id == target.id)
        else:
            stmt = stmt.where(WebhookEndpoint.user_id == target.id)

        res = await session.execute(stmt)
        return res.scalars().unique().all()

    async def get_event(self, session: AsyncSession, id: UUID) -> WebhookEvent | None:
        stmt = (
            sql.select(WebhookEvent)
            .where(
                WebhookEvent.id == id,
            )
            .options(joinedload(WebhookEvent.webhook_endpoint))
        )
        res = await session.execute(stmt)
        return res.scalars().unique().one_or_none()

    async def get_endpoint(
        self, session: AsyncSession, id: UUID
    ) -> WebhookEndpoint | None:
        stmt = sql.select(WebhookEndpoint).where(
            WebhookEndpoint.id == id,
        )
        res = await session.execute(stmt)
        return res.scalars().unique().one_or_none()

    async def send(
        self,
        session: AsyncSession,
        target: Organization | User,
        we: WebhookTypeObject,
    ) -> None:
        endpoints = await self.list_endpoints(session, target)

        payload: WebhookPayload | None = None

        match we[0]:
            case WebhookEventType.subscription_created:
                payload = WebhookSubscriptionCreatedPayload(
                    type=we[0],
                    data=SubscriptionSchema.model_validate(we[1]),
                )
            case WebhookEventType.subscription_updated:
                payload = WebhookSubscriptionUpdatedPayload(
                    type=we[0],
                    data=SubscriptionSchema.model_validate(we[1]),
                )
            case WebhookEventType.subscription_tier_created:
                payload = WebhookSubscriptionTierCreatedPayload(
                    type=we[0],
                    data=SubscriptionTierSchema.model_validate(we[1]),
                )
            case WebhookEventType.subscription_tier_updated:
                payload = WebhookSubscriptionTierUpdatedPayload(
                    type=we[0],
                    data=SubscriptionTierSchema.model_validate(we[1]),
                )

        if payload is None:
            raise Exception("no payload")

        for e in endpoints:
            event = WebhookEvent(
                webhook_endpoint_id=e.id, payload=payload.model_dump_json()
            )
            session.add(event)
            await session.flush()

            enqueue_job("webhook_event.send", webhook_event_id=event.id)

        return

    async def create_endpoint(
        self,
        session: AsyncSession,
        *,
        url: str,
        user_id: UUID | None,
        organization_id: UUID | None,
        secret: str,
    ) -> WebhookEndpoint:
        endpoint = WebhookEndpoint(
            url=url,
            user_id=user_id,
            organization_id=organization_id,
            secret=secret,
        )
        session.add(endpoint)
        await session.flush()
        return endpoint

    async def search_endpoints(
        self,
        session: AsyncSession,
        *,
        user_id: UUID | None,
        organization_id: UUID | None,
        pagination: PaginationParams,
    ) -> tuple[Sequence[WebhookEndpoint], int]:
        stmt = sql.select(WebhookEndpoint)

        if user_id is not None:
            stmt = stmt.where(WebhookEndpoint.user_id == user_id)
        if organization_id is not None:
            stmt = stmt.where(WebhookEndpoint.organization_id == organization_id)

        stmt = stmt.order_by(desc(WebhookEndpoint.created_at))

        results, count = await paginate(session, stmt, pagination=pagination)

        return results, count

    async def search_deliveries(
        self,
        session: AsyncSession,
        *,
        endpoint_id: UUID,
        pagination: PaginationParams,
    ) -> tuple[Sequence[WebhookDelivery], int]:
        stmt = sql.select(WebhookDelivery)

        stmt = stmt.where(WebhookDelivery.webhook_endpoint_id == endpoint_id)

        stmt = stmt.options(joinedload(WebhookDelivery.webhook_event))

        stmt = stmt.order_by(desc(WebhookDelivery.created_at))

        results, count = await paginate(session, stmt, pagination=pagination)

        return results, count


webhook_service = WebhookService()