from django.contrib import admin
from .models import Bookmark, Folder


admin.site.register(Folder)

admin.site.register(Bookmark)