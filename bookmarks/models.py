from django.db import models
from taggit.managers import TaggableManager


class Bookmark(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField()
    url = models.URLField()

    tags = TaggableManager()

    def __str__(self):
        return self.name

    
