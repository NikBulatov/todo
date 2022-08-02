from rest_framework import serializers
from todoapp.models import CustomUserModel as User


class UserBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
