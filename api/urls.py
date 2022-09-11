from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProjectViewSet, ToDoViewSet

from django.urls import path, include, re_path

app_name = 'api'

router = DefaultRouter()

router.register('users', UserViewSet)
router.register('projects', ProjectViewSet)
router.register('todos', ToDoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^(?P<version>\d\.\d)/users/$',
            UserViewSet.as_view({'get': 'list'})),
    re_path(r'^(?P<version>\d\.\d)/users/(?P<pk>\d+)/$',
            UserViewSet.as_view({'get': 'retrieve',
                                 'patch': 'update'}))

]
