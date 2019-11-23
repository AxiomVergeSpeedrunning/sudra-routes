from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Tutorial
from .serializers import TutorialSerializer


@api_view()
def all(request):
    return Response([TutorialSerializer(t).data for t in Tutorial.objects.all()])
