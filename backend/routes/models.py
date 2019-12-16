from django.db import models
from django.contrib.auth.models import User

from backend.mixins import TimestampMixin


class Category(TimestampMixin):
    name = models.CharField(max_length=256, null=True)


class Route(TimestampMixin):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routes')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='routes')

    title = models.CharField(max_length=256, null=True)
    content = models.TextField(null=True)
