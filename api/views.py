from rest_framework import mixins, status
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from todoapp import serializers
from todoapp.models import CustomUserModel as User, Project, ToDo
from .paginators import ProjectPagePagination, ToDoPagePagination
from .filters import ProjectFilter

class UserViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.UpdateModelMixin,
                  GenericViewSet):
    serializer_class = serializers.UserBaseSerializer
    queryset = User.objects.all()


class ProjectViewSet(ModelViewSet):
    serializer_class = serializers.ProjectBaseSerializer
    queryset = Project.objects.all()
    pagination_class = ProjectPagePagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class ToDoViewSet(ModelViewSet):
    serializer_class = serializers.ToDoBaseSerializer
    queryset = ToDo.objects.all()
    pagination_class = ToDoPagePagination
    filterset_class = ProjectFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.status == ToDo.StatusChoices.OPEN:
            instance.status = ToDo.StatusChoices.CLOSED
            instance.save()
            return Response('ToDo has been closed', status=status.HTTP_200_OK)
        return Response('ToDo is already closed',
                        status=status.HTTP_405_METHOD_NOT_ALLOWED)
