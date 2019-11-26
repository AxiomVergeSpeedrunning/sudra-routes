from django.urls import path
from . import views

urlpatterns = [
    path('get/<int:uid>/', views.retrieve),
    path('store/', views.store),
]
