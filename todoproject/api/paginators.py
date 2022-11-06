from rest_framework.pagination import PageNumberPagination


class ProjectPagePagination(PageNumberPagination):
    page_size = 10


class ToDoPagePagination(PageNumberPagination):
    page_size = 20

