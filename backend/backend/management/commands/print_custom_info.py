from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('username')

    def handle(self, *args, **kwargs):
        user = User.objects.get(username=kwargs['username'])

        print(user.custom_info.discord_user_id)
