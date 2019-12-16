from django.db import models

from backend.mixins import TimestampMixin


class Category(TimestampMixin):
    name = models.CharField(max_length=256, null=True)


class Route(TimestampMixin):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='routes')

    title = models.CharField(max_length=256, null=True)
    content = models.TextField(null=True)
