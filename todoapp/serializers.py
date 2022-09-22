from rest_framework import serializers
from todoapp.models import Project, ToDo, CustomUserModel as User


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')


class UserSerializerVersion01(UserBaseSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_superuser',
                  'is_staff')


class ProjectBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
