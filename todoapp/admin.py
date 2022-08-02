from django.contrib import admin
from .models import CustomUserModel as User

admin.site.register(User)
