from django.urls import path
from .views import search_news

urlpatterns = [
    path('search/', search_news),
]