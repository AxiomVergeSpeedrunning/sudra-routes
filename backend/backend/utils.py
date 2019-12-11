from graphene_django.rest_framework.mutation import SerializerMutation
from django.core.exceptions import PermissionDenied
from django import http
from graphene_django.views import GraphQLView

import rest_framework
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.settings import api_settings


class DRFAuthenticatedGraphQLView(GraphQLView):
    def parse_body(self, request):
        if isinstance(request, rest_framework.request.Request):
            return request.data
        return super(DRFAuthenticatedGraphQLView, self).parse_body(request)

    @classmethod
    def as_view(cls, *args, **kwargs):
        view = super(DRFAuthenticatedGraphQLView, cls).as_view(*args, **kwargs)
        view = permission_classes((IsAuthenticated,))(view)
        view = authentication_classes(api_settings.DEFAULT_AUTHENTICATION_CLASSES)(view)
        view = api_view(['GET', 'POST'])(view)
        return view


class TutorialSerializerMutation(SerializerMutation):
    class Meta:
        abstract = True

    @classmethod
    def perform_mutate(cls, serializer, info):
        serializer.validated_data['author'] = info.context.user
        return super(TutorialSerializerMutation, cls).perform_mutate(serializer, info)

    @classmethod
    def get_serializer_kwargs(cls, root, info, **input):
        if not info.context.user.is_authenticated or not info.context.user.is_staff:
            raise PermissionDenied

        if 'id' in input:
            instance = cls._meta.model_class.objects.filter(
                id=input['id'], author=info.context.user
            ).first()

            if instance:
                return {'instance': instance, 'data': input, 'partial': True}
            else:
                raise http.Http404

        return {'data': input, 'partial': True}
