from django.urls import path
from . import views

urlpatterns = [path("", views.BookmarkListView.as_view(), name="bookmarks")]
