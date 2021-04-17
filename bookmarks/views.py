from django.shortcuts import render
from django.views import generic
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Bookmark
from .filters import BookmarkFilter
from .forms import BookmarkForm


class BookmarkListView(generic.ListView):

    model = Bookmark

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["filter"] = BookmarkFilter(
            self.request.GET, queryset=self.get_queryset()
        )

        bookmark_form = BookmarkForm(None)
        context["bookmark_form"] = bookmark_form

        return context


def create_bookmark_view(request):

    bookmark_form = BookmarkForm(request.POST)

    if bookmark_form.is_valid():
        bookmark_form.save()
        return HttpResponseRedirect(reverse("bookmarks"))
