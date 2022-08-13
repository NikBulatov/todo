from django.core.management.base import BaseCommand
from todoapp.models import CustomUserModel as User


class Command(BaseCommand):
    help = "Create my superuser"

    def handle(self, *args, **options):
        User.objects.create_superuser(
            email="admin@example.com",
            password="admin",
        )

        print(f"SuperUser was created")
