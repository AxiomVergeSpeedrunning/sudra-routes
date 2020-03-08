from django.contrib import admin
from .models import TrackerInformation, ItemTracker


admin.site.register(TrackerInformation)
admin.register(ItemTracker)
