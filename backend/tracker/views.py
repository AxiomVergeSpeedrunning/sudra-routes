from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction

from .models import TrackerInformation
from .serializers import TrackerInformationSerializer
from .utils import translate_data


@api_view()
def retrieve(request, uid):
    info, created = TrackerInformation.objects.get_or_create(user_id=uid)
    serialized = TrackerInformationSerializer(info)

    return Response(serialized.data)


@api_view(['POST'])
def store(request):
    if not request.user.is_authenticated:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    with transaction.atomic():
        info, created = TrackerInformation.objects.get_or_create(user=request.user)

        translate_data(request.data, info)
        info.save()

    serialized = TrackerInformationSerializer(info)

    return Response(serialized.data)
