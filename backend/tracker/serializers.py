from rest_framework import serializers
from .models import TrackerInformation


class TrackerInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrackerInformation
        fields = '__all__'
