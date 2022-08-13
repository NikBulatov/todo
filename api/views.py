from rest_framework.viewsets import ModelViewSet
from todoapp.serializers import UserBaseSerializer
from todoapp.models import CustomUserModel as User


class UserViewSet(ModelViewSet):
    serializer_class = UserBaseSerializer
    queryset = User.objects.all()
