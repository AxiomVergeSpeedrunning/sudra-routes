from django.urls import path
from . import views

urlpatterns = [
    path('get/', views.retrieve),
    path('store/', views.store),
]
