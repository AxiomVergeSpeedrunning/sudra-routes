from django.db import models
from django.contrib.auth.models import User


class TutorialBase(models.Model):
    class Meta:
        abstract = True
        ordering = ('pk',)

    title = models.CharField(max_length=256, null=True)
    content = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)


class Tutorial(TutorialBase):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tutorials')
