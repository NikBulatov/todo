from rest_framework.routers import DefaultRouter
from .views import UserViewSet

from django.urls import path, include

app_name = 'api'

router = DefaultRouter()

router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
