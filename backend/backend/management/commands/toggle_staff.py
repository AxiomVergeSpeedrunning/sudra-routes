from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('username')

    def handle(self, *args, **kwargs):
        user = User.objects.get(username=kwargs['username'])
        user.is_staff = not user.is_staff
        user.is_superuser = not user.is_superuser
        user.save()

        if not user.is_staff:
            print(f'Removed privileges from {user.username}')
        else:
            print(f'Added privileges to {user.username}')
