from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, BasePermission

from authors.models import Author, Biography, Book, Article
from authors.serializers import AuthorModelSerializer, BiographyModelSerializer, BookModelSerializer, \
    ArticleModelSerializer


class SuperuserOnly(BasePermission):

    def has_permission(self, request, view):
        return request.user.is_superuser


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer
    permission_classes = [SuperuserOnly]


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer
