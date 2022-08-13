from rest_framework.viewsets import ModelViewSet
from todoapp import serializers
from todoapp.models import CustomUserModel as User, Project, ToDo


class UserViewSet(ModelViewSet):
    serializer_class = serializers.UserBaseSerializer
    queryset = User.objects.all()


class ProjectViewSet(ModelViewSet):
    serializer_class = serializers.ProjectBaseSerializer
    queryset = Project.objects.all()


class ToDoViewSet(ModelViewSet):
    serializer_class = serializers.ToDoBaseSerializer
    queryset = ToDo.objects.all()
