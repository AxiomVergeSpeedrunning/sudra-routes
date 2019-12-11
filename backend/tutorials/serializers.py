from rest_framework import serializers
from .models import Tutorial


class BaseMeta:
    exclude = ['author']


class BaseSerializer(serializers.ModelSerializer):
    pass


class TutorialSerializer(BaseSerializer):
    class Meta(BaseMeta):
        model = Tutorial
