from django.db import models
from django.contrib.auth.models import User


class TrackerInformation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tracker_info', primary_key=True)
    difficulty = models.CharField(max_length=256, null=True, blank=True)
    area_item_percentage = models.IntegerField(null=True, blank=True)
    area_map_percentage = models.IntegerField(null=True, blank=True)
    current_health = models.IntegerField(null=True, blank=True)
    max_health = models.IntegerField(null=True, blank=True)
    red_goo_destroyed = models.IntegerField(null=True, blank=True)
    bricks_destroyed = models.IntegerField(null=True, blank=True)
    creatures_glitched = models.IntegerField(null=True, blank=True)
    deaths = models.IntegerField(null=True, blank=True)
    area_name = models.CharField(max_length=256, null=True, blank=True)
    overall_item_percentage = models.IntegerField(null=True, blank=True)
    overall_map_percentage = models.IntegerField(null=True, blank=True)
