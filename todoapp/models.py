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

    def __str__(self):
        return
