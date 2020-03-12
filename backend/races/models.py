from django.db import models

from backend.mixins import TimestampMixin


class Race(TimestampMixin):
    title = models.CharField(max_length=256)
    start_time = models.BigIntegerField(null=True, blank=True)
    started = models.BooleanField(null=True)
    commentator_name = models.CharField(max_length=256, null=True, blank=True)
    game_name = models.CharField(max_length=256, null=True, blank=True)
    category = models.CharField(max_length=256, null=True, blank=True)
    extra_information = models.TextField(null=True, blank=True)


class Runner(models.Model):
    race = models.ForeignKey(Race, on_delete=models.CASCADE, related_name='runners')
    name = models.CharField(max_length=256, null=True, blank=True)
    end_time = models.BigIntegerField(null=True, blank=True)
