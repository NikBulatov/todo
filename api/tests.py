from django.test import TestCase
from rest_framework.test import (APIRequestFactory,
                                 APIClient,
                                 APITestCase,
                                 force_authenticate)
from api.views import ProjectViewSet, ToDoViewSet, UserViewSet
from rest_framework import status
from todoapp.models import CustomUserModel
from mixer.backend.django import mixer


class TestWithAPIRequestFactory(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = mixer.blend(CustomUserModel)
        self.views_sets = (
            ('projects', ProjectViewSet),
            ('users', UserViewSet),
            ('todos', ToDoViewSet)
        )

    def test_get_by_guest(self):
        for domain, view_set in self.views_sets:
            request = self.factory.get(f'/api/{domain}/', format='json')
            view = view_set.as_view({'get': 'list'})
            response = view(request)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_by_auth_user(self):
        for domain, view_set in self.views_sets:
            request = self.factory.get(f'/api/{domain}/', format='json')
            force_authenticate(request, self.user)
            view = view_set.as_view({'get': 'list'})
            response = view(request)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
