import requests

from ratelimit.decorators import ratelimit
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.db.models import Q

from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from custom_auth.models import CustomUserInformation
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
    CustomUserInformation.objects.create(user=user)

    return Response({'token': token.key, 'user_info': UserSerializer(user).data})


@api_view()
def check(request):
    if request.user.is_authenticated:
        return Response({
            'token': Token.objects.get(user=request.user).key,
            'user_info': UserSerializer(request.user).data,
        })

    return Response({}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def rtmp_check(request):
    failure = Response({}, status=status.HTTP_404_NOT_FOUND)

    try:
        user = User.objects.get(username=request.data['name'], auth_token__key=request.data['token'])

        if user.custom_info.discord_user_id is None:
            return failure

        response = requests.get(
            f'https://discordapp.com/api/guilds/{settings.DISCORD_SERVER_ID}/members/{user.custom_info.discord_user_id}',
            headers={
                'Authorization': f'Bot {settings.DISCORD_BOT_TOKEN}'
            }
        )

        # Check that the user has the runner role
        if settings.DISCORD_ROLE_ID not in response.json()['roles']:
            return failure

        return Response({})
    except Exception:
        return failure


@ratelimit(key='ip', rate='5/hr', block=True)
@api_view(['POST'])
def store_discord(request):
    if not request.user.is_authenticated:
        return Response({}, status=status.HTTP_403_FORBIDDEN)

    token = request.data['token']

    try:
        res = requests.get('https://discordapp.com/api/users/@me', headers={'Authorization': f'Bearer {token}'})
        request.user.custom_info.discord_user_id = res.json()['id']

        return Response({})
    except Exception as e:
        print(e)
        return Response({}, status=status.HTTP_404_NOT_FOUND)
