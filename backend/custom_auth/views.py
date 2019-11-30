from ratelimit.decorators import ratelimit
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db.models import Q

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from backend.serializers import UserSerializer


@ratelimit(key='ip', rate='50/hr', block=True)
@api_view(['POST'])
def login(request):
    username = request.data['username']
    password = request.data['password']

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    token = Token.objects.get(user=user)

    return Response({'token': token.key, 'user_info': UserSerializer(user).data})


@ratelimit(key='ip', rate='10/hr', block=True)
@api_view(['POST'])
def register(request):
    username = request.data['username']
    password = request.data['password']
    email = request.data['email']

    if User.objects.filter(Q(email=email) | Q(username=username)).exists():
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    user = User.objects.create_user(username, email=email, password=password)
    token = Token.objects.create(user=user)

    return Response({'token': token.key, 'user_info': UserSerializer(user).data})


@api_view()
def check(request):
    if request.user.is_authenticated:
        return Response({
            'token': Token.objects.get(user=request.user).key,
            'user_info': UserSerializer(request.user).data,
        })

    return Response({}, status=status.HTTP_403_FORBIDDEN)
