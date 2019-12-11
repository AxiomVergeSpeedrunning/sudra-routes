from graphene import ObjectType, Field, List
from graphene_django.types import DjangoObjectType

from backend.utils import TutorialSerializerMutation

from .models import Tutorial
from .serializers import TutorialSerializer


class TutorialNode(DjangoObjectType):
    class Meta:
        model = Tutorial
        filter_fields = ['id', 'author', 'title', 'content']


class TutorialMutation(TutorialSerializerMutation):
    class Meta:
        serializer_class = TutorialSerializer


class Query(object):
    tutorial = Field(TutorialNode)
    tutorials = List(TutorialNode)

    def resolve_tutorials(self, info, **kwargs):
        return Tutorial.objects.all()


class Mutation(ObjectType):
    create_tutorial = TutorialMutation.Field()
    update_tutorial = TutorialMutation.Field()
