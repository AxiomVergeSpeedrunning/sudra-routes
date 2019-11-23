from django.db import models
from django.contrib.auth.models import User


class Tutorial(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutorials')
    content = models.TextField()
