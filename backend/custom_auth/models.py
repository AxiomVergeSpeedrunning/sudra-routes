from django.contrib.auth.models import User
from django.db import models


class CustomUserInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='custom_info')
    discord_user_id = models.CharField(max_length=256, null=True, blank=True)
