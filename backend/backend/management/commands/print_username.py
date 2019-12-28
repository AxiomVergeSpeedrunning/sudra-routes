from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('email')

    def handle(self, *args, **kwargs):
        user = User.objects.get(email=kwargs['email'])

        print(user.username)
