from django.db import models


class Author(models.Model):
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()

    def __str__(self):
        return f'{self.first_name}-{self.last_name}'


class Biography(models.Model):
    text = models.TextField(blank=True, null=True)
    author = models.OneToOneField(Author, on_delete=models.CASCADE)


class Book(models.Model):
    name = models.CharField(max_length=50)
    authors = models.ManyToManyField(Author)


class Article(models.Model):
    name = models.CharField(max_length=50)
    author = models.ForeignKey(Author, models.PROTECT)
