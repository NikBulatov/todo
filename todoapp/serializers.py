from rest_framework import serializers
from todoapp.models import Project, ToDo, CustomUserModel as User


class UserBaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')


class UserSerializerVersion01(UserBaseSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_superuser',
                  'is_staff')


class ProjectBaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)
    users = UserBaseSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        users_data = validated_data.pop('users', None) or self.initial_data.pop(
            'users', None)
        users_id = [user.get('id') for user in users_data]
        users = User.objects.filter(id__in=users_id)
        if len(users) == len(users_id):
            project = Project.objects.create(**validated_data)
            for user in users:
                project.users.add(user)
            project.save()
            return project

    def update(self, instance, validated_data):
        users_data = validated_data.pop('users', None) or self.initial_data.pop(
            'users', None)
        users_id = [user.get('id') for user in users_data]
        users = User.objects.filter(id__in=users_id)
        if len(users) == len(users_id):
            instance.users.clear()
            for user in users:
                instance.users.add(user)

        instance.name = validated_data.get("name", instance.name)
        instance.url = validated_data.get("url", instance.url)
        instance.save()
        return instance


class ToDoBaseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    user = UserBaseSerializer(read_only=True)

    class Meta:
        model = ToDo
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user', None) or self.initial_data.pop(
            'user', None)
        user = User.objects.get(id=user_data.get('id'))

        if user:
            todo = ToDo.objects.create(user=user,
                                       user_id=user.id,
                                       **validated_data)

            todo.save()
            return todo

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None) or self.initial_data.pop(
            'user', None)
        user = User.objects.get(id=user_data.get('id'))

        if user:
            instance.user = user
            instance.user_id = user.id
        instance.project = validated_data.get('project', None)

        instance.text = validated_data.get('text', None)
        instance.status = validated_data.get('status', None)
        instance.save()
        return instance
