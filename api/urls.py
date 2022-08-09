from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProjectViewSet, ToDoViewSet

from django.urls import path, include

app_name = 'api'

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', ToDoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
