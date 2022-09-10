import string
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import (APIRequestFactory,
                                 APIClient,
                                 APITestCase,
                                 force_authenticate)
from api.views import ProjectViewSet, ToDoViewSet, UserViewSet
from rest_framework import status
from todoapp.models import CustomUserModel
from mixer.backend.django import mixer
from rest_framework.authtoken.models import Token


class TestWithAPIRequestFactory(TestCase):

    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = mixer.blend(get_user_model())
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


class TestWithAPIClient(TestCase):
    def setUp(self):
        self.account = CustomUserModel.objects.create_superuser(
            email='test@t.com',
            password='Test!123')
        self.user = CustomUserModel.objects.create(email='test_us@u.com',
                                                   first_name='Lydia',
                                                   last_name='Rush',
                                                   id=100)
        self.new_first_name, self.new_last_name = 'Лидия', 'Раш'

        self.client = APIClient()
        self.token = mixer.blend(Token, user=self.account)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.client.login(email=self.account.email,
                          password=self.account.password,
                          token=self.token.key)

    def test_change_user_data(self):
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   data={
                                       'email': self.user.email,
                                       'firstName': self.new_first_name,
                                       'lastName': self.new_last_name,
                                   })

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        result = CustomUserModel.objects.get(id=100)

        self.assertEqual(result.first_name, self.new_first_name)
        self.assertEqual(result.last_name, self.new_last_name)

    def test_guest_change_user_data(self):
        self.client = APIClient()
        response = self.client.put(f'/api/users/{self.user.id}/',
                                   data={
                                       'email': self.user.email,
                                       'firstName': self.new_first_name,
                                       'lastName': self.new_last_name,
                                   })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestWithAPITestCase(APITestCase):
    def setUp(self):
        self.account = CustomUserModel.objects.create_superuser(
            email='test@t.com',
            password='Test!123')

        self.email = 'test_mail@mail.com'
        self.first_name = 'TEST_NAME',
        self.last_name = 'TEST_LAST_NAME',

        self.token = mixer.blend(Token, user=self.account)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        self.client.login(email=self.account.email,
                          password=self.account.password,
                          token=self.token.key)

    def test_auth_user_create_new_user(self):
        response = self.client.post('/api/users/', {
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
        })

        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)
