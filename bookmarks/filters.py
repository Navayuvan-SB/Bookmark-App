import django_filters
from django import forms
from .models import Bookmark


class BookmarkFilter(django_filters.FilterSet):

    CHOICES = (
        ("ascending", "A-Z"),
        ("descending", "Z-A"),
    )

    sort_by = django_filters.ChoiceFilter(
        label="Sort By", method="sort_by_preference", choices=CHOICES
    )

    class Meta:
        model = Bookmark
        fields = {"name": ["icontains"], "folder": ["exact"]}

    def sort_by_preference(self, queryset, name, value):
        expression = "name" if value == "ascending" else "-name"
        return queryset.order_by(expression)
