from graphene import ObjectType, List, Int
from graphene_django.types import DjangoObjectType
from graphene_django_extras import DjangoObjectField
from graphene_django_cud.mutations import DjangoCreateMutation, DjangoPatchMutation

from backend.utils import user_is_staff
from .models import Tutorial


class TutorialNode(DjangoObjectType):
    class Meta:
        model = Tutorial


class CreateTutorialMutation(DjangoCreateMutation):
    class Meta:
        model = Tutorial
        auto_context_fields = {
            'author': 'user',
        }

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class UpdateTutorialMutation(DjangoPatchMutation):
    class Meta:
        model = Tutorial

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class Query(object):
    tutorial = DjangoObjectField(TutorialNode, id=Int())
    tutorials = List(TutorialNode)

    def resolve_tutorials(self, info, **kwargs):
        return Tutorial.objects.all()


class Mutation(ObjectType):
    create_tutorial = CreateTutorialMutation.Field()
    update_tutorial = UpdateTutorialMutation.Field()
