from graphene import Field, List
from graphene_django.types import DjangoObjectType

from django.contrib.auth.models import User


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']


class Query(object):
    user = Field(UserNode)
    users = List(UserNode)

    def resolve_users(self, info, **kwargs):
        if not info.context.user.is_superuser:
            return User.objects.none()

        return User.objects.all()
