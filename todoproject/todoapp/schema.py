import graphene
from graphene_django import DjangoObjectType
from todoapp.models import CustomUserModel, Project, ToDo


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUserModel
        fields = ('id', 'first_name', 'last_name', 'email')


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    projects = graphene.List(ProjectType)
    todos = graphene.List(ToDoType)

    user_by_id = graphene.Field(UserType, id=graphene.ID(required=True))
    users_by_todo_id = graphene.List(UserType, id=graphene.ID(required=True))
    todos_by_user_id = graphene.List(ToDoType, id=graphene.ID(required=True))
    projects_by_user_id = graphene.List(ProjectType,
                                        id=graphene.ID(required=True))

    def resolve_todos_by_user_id(self, info, id):
        try:
            return ToDo.objects.filter(user__id=id)
        except ToDo.DoesNotExist:
            return None

    def resolve_projects_by_user_id(self, info, id):
        try:
            return Project.objects.filter(users__id=id)
        except Project.DoesNotExist:
            return None

    def resolve_users_by_todo_id(self, info, id):
        try:
            return ToDo.objects.get(id=id).project.users.all()
        except ToDo.DoesNotExist:
            return None

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUserModel.objects.get(id=id)
        except CustomUserModel.DoesNotExist:
            return None

    def resolve_users(root, info):
        return CustomUserModel.objects.all()

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_todos(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
