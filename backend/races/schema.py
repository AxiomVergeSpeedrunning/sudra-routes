from graphene import List, ObjectType
from graphene_django.types import DjangoObjectType
from graphene_django_extras import DjangoObjectField
from graphene_django_cud.mutations import DjangoCreateMutation, DjangoPatchMutation

from backend.utils import user_is_staff
from .models import Race, Runner


class RaceNode(DjangoObjectType):
    class Meta:
        model = Race


class RunnerNode(DjangoObjectType):
    class Meta:
        model = Runner


class CreateRaceMutation(DjangoCreateMutation):
    class Meta:
        model = Race

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class UpdateRaceMutation(DjangoPatchMutation):
    class Meta:
        model = Race

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class CreateRunnerMutation(DjangoCreateMutation):
    class Meta:
        model = Runner

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class UpdateRunnerMutation(DjangoPatchMutation):
    class Meta:
        model = Runner

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class Query(object):
    race = DjangoObjectField(RaceNode)
    races = List(RaceNode)

    runner = DjangoObjectField(RunnerNode)
    runners = List(RunnerNode)

    def resolve_races(self, *args, **kwargs):
        return Race.objects.all()

    def resolve_runners(self, *args, **kwargs):
        return Runner.objects.all()


class Mutation(ObjectType):
    create_race = CreateRaceMutation.Field()
    update_race = UpdateRaceMutation.Field()

    create_runner = CreateRunnerMutation.Field()
    update_runner = UpdateRunnerMutation.Field()
