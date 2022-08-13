import random
import string
from django.core.management.base import BaseCommand, CommandError
from todoapp.models import CustomUserModel as User


def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


class Command(BaseCommand):
    help = "Create any quantity of employees. Default 10 employees are created."

    def add_arguments(self, parser):
        parser.add_argument(
            '-q',
            '--quantity',
            action='store',
            default='10',
            required=False,
            help='Quantity of employees to create. Default 10'
        )

    def handle(self, *args, **options):
        try:
            for number in range(int(options['quantity'])):
                name = f'employee_{randomword(8)}'
                User.objects.create_user(
                    email=f"{name}@inc.com",
                    password="Test!123",
                )
        except CommandError:
            print("Error occurred while creating employees")
        else:
            print(f"{options['quantity']} employees were created")
