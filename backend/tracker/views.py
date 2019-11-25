from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import TrackerInformation


@api_view()
def retrieve(request):
    if not request.user.is_authenticated:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    info, created = TrackerInformation.objects.get_or_create(user=request.user)

    return Response(info.data)


@api_view(['POST'])
def store(request):
    if not request.user.is_authenticated:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    info, created = TrackerInformation.objects.get_or_create(user=request.user)

    info.data = request.data
    info.save()

    return Response(info.data)
