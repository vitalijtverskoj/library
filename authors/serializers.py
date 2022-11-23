from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from authors.models import Author, Biography, Book, Article


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        # fields = ('first_name', 'last_name')
        # exclude = ('last_name',)


class BiographyModelSerializer(ModelSerializer):
    class Meta:
        model = Biography
        fields = '__all__'


class BookModelSerializer(ModelSerializer):
    # authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Book
        fields = '__all__'


class ArticleModelSerializer(ModelSerializer):
    # author = AuthorModelSerializer()

    class Meta:
        model = Article
        fields = '__all__'

