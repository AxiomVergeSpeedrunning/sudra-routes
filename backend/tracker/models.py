from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import HStoreField


class TrackerInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tracker_info')
    data = HStoreField()
