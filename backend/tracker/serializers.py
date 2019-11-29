from .models import TrackerInformation, ItemTracker

from drf_writable_nested.serializers import WritableNestedModelSerializer


class ItemTrackerSerializer(WritableNestedModelSerializer):
    class Meta:
        model = ItemTracker
        exclude = ['main_info']


class TrackerInformationSerializer(WritableNestedModelSerializer):
    class Meta:
        model = TrackerInformation
        fields = '__all__'

    item_info = ItemTrackerSerializer()
