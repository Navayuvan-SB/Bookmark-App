from django.shortcuts import render
from django.views import generic
from .models import Bookmark
from .filters import BookmarkFilter


class BookmarkListView(generic.ListView):

    model = Bookmark

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["filter"] = BookmarkFilter(
            self.request.GET, queryset=self.get_queryset()
        )
        return context
