import functools
from typing import Awaitable, Callable, ParamSpec, TypeVar

from asgiref.sync import async_to_sync
from celery import Celery

from polar.config import settings
from polar.postgres import AsyncSessionLocal

app = Celery(
    "polar", backend=settings.CELERY_BACKEND_URL, broker=settings.CELERY_BROKER_URL
)
app.conf.update(
    task_always_eager=settings.CELERY_TASK_ALWAYS_EAGER,
)
task = app.task


Params = ParamSpec("Params")
ReturnValue = TypeVar("ReturnValue")


def asyncify_task(
    with_session: bool = False,
) -> Callable[[Callable[Params, ReturnValue]], Callable[Params, ReturnValue]]:
    def a2s(
        f: Callable[Params, Awaitable[ReturnValue]]
    ) -> Callable[Params, Awaitable[ReturnValue]]:
        # Since we're running Celery in eager mode during test, we're in
        # an asyncio event loop and can skip the async_to_sync wrapper.
        if not settings.is_testing():
            return async_to_sync(f)  # type: ignore
        return f

    async def inject_session(
        f: Callable[Params, Awaitable[ReturnValue]],
        *args: Params.args,
        **kwargs: Params.kwargs
    ) -> ReturnValue:
        async with AsyncSessionLocal() as session:
            return await f(session, *args, **kwargs)

    def decorator(f: Callable[Params, ReturnValue]) -> Callable[Params, ReturnValue]:
        @functools.wraps(f)
        def wrapper(*args: Params.args, **kwargs: Params.kwargs) -> ReturnValue:
            if not with_session:
                return a2s(f)(*args, **kwargs)  # type: ignore
            return a2s(inject_session)(f, *args, **kwargs)  # type: ignore

        return wrapper

    return decorator
