import random
import string
from mixer.backend.django import mixer
from django.core.management.base import BaseCommand, CommandError
from todoapp.models import CustomUserModel as User


def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for _ in range(length))


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
                mixer.blend(User)
        except CommandError:
            print("Error occurred while creating employees")
        else:
            print(f"{options['quantity']} employees were created")
