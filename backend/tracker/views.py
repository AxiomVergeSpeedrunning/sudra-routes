from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, serializers
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
        json_data = {
            'user_id': request.user.id,
        }
        translate_data(request.data, json_data)
        serialized = TrackerInformationSerializer(data=json_data)

        try:
            serialized.is_valid(raise_exception=True)
            serialized.save()
            return serialized.data()
        except serializers.ValidationError:
            return Response({}, status=status.HTTP_403_FORBIDDEN)
