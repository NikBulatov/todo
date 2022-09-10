from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from todoapp.models import CustomUserModel as User, Project, ToDo


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class ProjectBaseSerializer(WritableNestedModelSerializer):
    users = UserBaseSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoBaseSerializer(WritableNestedModelSerializer):
    project = ProjectBaseSerializer()
    user = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
