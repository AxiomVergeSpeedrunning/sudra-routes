from graphene import Field, List
from graphene_django.types import DjangoObjectType

from django.contrib.auth.models import User


class UserNode(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = ['id', 'username', 'email']


class Query(object):
    user = Field(UserNode)
    users = List(UserNode)

    def resolve_users(self, info, **kwargs):
        return User.objects.all()
