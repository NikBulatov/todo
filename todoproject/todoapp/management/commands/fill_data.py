from django.core.management.base import BaseCommand, CommandError
from mixer.backend.django import mixer

from todoapp.models import Project, ToDo


class Command(BaseCommand):
    help = 'Create data for Project and ToDo models'

    def add_arguments(self, parser):
        parser.add_argument(
            '-p',
            '--project',
            action='store',
            default='10',
            required=False,
            help='Quantity of projects to create. Default 10'
        )
        parser.add_argument(
            '-t',
            '--todo',
            action='store',
            default='10',
            required=False,
            help='Quantity of ToDo to create. Default 10'
        )

    def handle(self, *args, **options):
        try:

            for _ in range(int(options['project'])):
                mixer.blend(Project)
            for _ in range(int(options['todo'])):
                mixer.blend(ToDo)
        except CommandError:
            print("Error occurred while creating data")
        else:
            print(f"{options['project']} projects were created\n"
                  f"{options['todo']} todo were created")
