from graphene import List, ObjectType
from graphene_django.types import DjangoObjectType
from graphene_django_extras import DjangoObjectField
from graphene_django_cud.mutations import DjangoCreateMutation, DjangoPatchMutation

from backend.utils import user_is_staff
from .models import Category, Route


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category


class CreateCategoryMutation(DjangoCreateMutation):
    class Meta:
        model = Category

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class UpdateCategoryMutation(DjangoPatchMutation):
    class Meta:
        model = Category

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class RouteNode(DjangoObjectType):
    class Meta:
        model = Route


class CreateRouteMutation(DjangoCreateMutation):
    class Meta:
        model = Route
        auto_context_fields = {
            'author': 'user',
        }

    # TODO: Find a way to do this less without making graphene break
    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class UpdateRouteMutation(DjangoPatchMutation):
    class Meta:
        model = Route

    @classmethod
    @user_is_staff
    def check_permissions(cls, *args, **kwargs):
        super().check_permissions(*args, **kwargs)


class Query(object):
    category = DjangoObjectField(CategoryNode)
    categories = List(CategoryNode)

    route = DjangoObjectField(RouteNode)
    routes = List(RouteNode)

    def resolve_categories(self, *args, **kwargs):
        return Category.objects.all()

    def resolve_routes(self, *args, **kwargs):
        return Route.objects.all()


class Mutation(ObjectType):
    create_category = CreateCategoryMutation.Field()
    update_category = UpdateCategoryMutation.Field()

    create_route = CreateRouteMutation.Field()
    update_route = UpdateRouteMutation.Field()
