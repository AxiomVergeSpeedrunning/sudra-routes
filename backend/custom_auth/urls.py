from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('check/', views.check),
    path('rtmp-check/', views.rtmp_check),
]
