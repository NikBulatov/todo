from rest_framework import serializers
from todoapp.models import CustomUserModel as User, Project, ToDo


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')


class ProjectBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoBaseSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
