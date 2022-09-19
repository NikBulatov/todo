from collections import namedtuple as ntuple
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext_lazy as _


class UserManager(BaseUserManager):
    """Definition of a model manager for User model with no username field"""

    use_in_migrations = True
    isField = ntuple("isField", ("is_staff", "is_superuser", "is_active"))

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create a new simple user with no any permissions"""
        extra_fields.setdefault(self.isField.is_staff, False)
        extra_fields.setdefault(self.isField.is_superuser, False)
        extra_fields.setdefault(self.isField.is_active, True)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create a new superuser"""
        extra_fields.setdefault(self.isField.is_staff, True)
        extra_fields.setdefault(self.isField.is_superuser, True)
        extra_fields.setdefault(self.isField.is_active, True)

        for field in self.isField._fields:
            if extra_fields.get(field) is not True:
                raise ValueError(f"Superuser must have {field}=True.")
        return self._create_user(email, password, **extra_fields)
