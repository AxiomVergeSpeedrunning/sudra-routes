from django.core.exceptions import PermissionDenied
from graphene_django.views import GraphQLView

import rest_framework
from rest_framework.decorators import authentication_classes, api_view
from rest_framework.settings import api_settings


class DRFAuthenticatedGraphQLView(GraphQLView):
    def parse_body(self, request):
        if isinstance(request, rest_framework.request.Request):
            return request.data
        return super(DRFAuthenticatedGraphQLView, self).parse_body(request)

    @classmethod
    def as_view(cls, *args, **kwargs):
        view = super(DRFAuthenticatedGraphQLView, cls).as_view(*args, **kwargs)
        view = authentication_classes(api_settings.DEFAULT_AUTHENTICATION_CLASSES)(view)
        view = api_view(['GET', 'POST'])(view)
        return view


def user_is_superuser(func):
    def wrapped(*args, **kwargs):
        if not args[2].context.user.is_superuser:
            raise PermissionDenied

        return func(*args, **kwargs)

    return wrapped


def user_is_staff(func):
    def wrapped(*args, **kwargs):
        if not args[2].context.user.is_staff:
            raise PermissionDenied

        return func(*args, **kwargs)

    return wrapped
