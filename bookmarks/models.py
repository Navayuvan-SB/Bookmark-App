from django.db import models
from taggit.managers import TaggableManager


class Folder(models.Model):
    name = models.CharField(max_length=200, verbose_name="Folder Name")

    def __str__(self):
        return self.name


class Bookmark(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()

    tags = TaggableManager()

    folder = models.ForeignKey(
        Folder, on_delete=models.CASCADE, default=None, null=True
    )

    def __str__(self):
        return self.name

    def get_tags(self):

        comma_separated_tags = ""
        tags = self.tags.names()
        for tag in tags:
            comma_separated_tags += tag + ","

        return comma_separated_tags