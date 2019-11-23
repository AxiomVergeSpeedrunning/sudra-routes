from rest_framework import serializers
from .models import Tutorial

from backend.serializers import UserSerializer


class TutorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutorial
        fields = ['id', 'content', 'author']

    author = UserSerializer()
