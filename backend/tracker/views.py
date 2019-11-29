from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .models import TrackerInformation
from .serializers import TrackerInformationSerializer
from .utils import translate_data


@api_view()
def retrieve(request, uid):
    try:
        info = TrackerInformation.objects.select_related('item_info').get(user_id=uid)
        serialized = TrackerInformationSerializer(info)

        return Response(serialized.data)
    except TrackerInformation.DoesNotExist:
        serialized = TrackerInformationSerializer(TrackerInformation())

        return Response(serialized.data)


@api_view(['POST'])
def store(request):
    if not request.user.is_authenticated:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    with transaction.atomic():
        info = TrackerInformation.objects.select_related('item_info').get(user=request.user)
        json_data = {
            'user': request.user.id,
        }
        translate_data(request.data, json_data, is_dict=True)
        serialized = TrackerInformationSerializer(info, data=json_data)

        serialized.is_valid()
        serialized.save(raise_exception=True)
        return Response(serialized.data)
