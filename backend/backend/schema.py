import graphene
from tutorials import schema as tutorials_schema
from custom_auth import schema as auth_schema
from routes import schema as routes_schema
from races import schema as races_schema


# Add Query mixins from each app's schema as we create them
class Query(
        tutorials_schema.Query,
        auth_schema.Query,
        routes_schema.Query,
        races_schema.Query,
        graphene.ObjectType):
    pass


class Mutation(
        tutorials_schema.Mutation,
        routes_schema.Mutation,
        races_schema.Mutation,
        graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
