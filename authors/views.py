from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from authors.models import Author, Biography, Book, Article
from authors.serializers import AuthorModelSerializer, BiographyModelSerializer, BookModelSerializer, \
    ArticleModelSerializer


class AuthorModelViewSet(ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorModelSerializer


class BiographyModelViewSet(ModelViewSet):
    queryset = Biography.objects.all()
    serializer_class = BiographyModelSerializer


class BookModelViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookModelSerializer


class ArticleModelViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleModelSerializer
