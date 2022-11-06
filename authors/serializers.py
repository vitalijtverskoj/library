from rest_framework.serializers import ModelSerializer
from authors.models import Author


class AuthorModelSerializer(ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        # fields = ('first_name', 'last_name')
        # exclude = ('last_name',)
