from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from .validators import EmailAddressValidator


class CustomUserModel(AbstractUser):
    username = None
    email = models.EmailField(
        _("email address"), unique=True, validators=[EmailAddressValidator]
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        db_table = "users"
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f'{self.last_name} {self.first_name}'


class Project(models.Model):
    class Meta:
        db_table = 'projects'
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'

    name = models.CharField(max_length=128)
    url = models.URLField(blank=True)
    users = models.ManyToManyField(CustomUserModel)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    class Meta:
        db_table = 'todos'
        verbose_name = 'ToDo'
        verbose_name_plural = 'ToDos'

    class StatusChoices(models.TextChoices):
        OPEN = 'o', 'open'
        CLOSED = 'c', 'closed'

    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(CustomUserModel, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=StatusChoices.choices)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return f'ToDo by {self.user} | {self.project}'
