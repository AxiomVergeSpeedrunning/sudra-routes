from graphene import List, Int
from graphene_django.types import DjangoObjectType
from graphene_django_extras import DjangoObjectField

from .models import Category, Route


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category


class RouteNode(DjangoObjectType):
    class Meta:
        model = Route


class Query(object):
    category = DjangoObjectField(CategoryNode, id=Int())
    categories = List(CategoryNode)

    route = DjangoObjectField(RouteNode)
    routes = List(RouteNode)
