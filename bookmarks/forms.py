from django.forms import ModelForm
from .models import Bookmark


class BookmarkForm(ModelForm):
    class Meta:
        model = Bookmark
        fields = ("name", "description", "url", "tags")