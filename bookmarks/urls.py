from django.urls import path
from . import views

urlpatterns = [
    path("", views.BookmarkListView.as_view(), name="bookmarks"),
    path("create", views.create_bookmark_view, name="add-bookmark"),
    path("<int:pk>/edit", views.edit_bookmark_view, name="edit-bookmark"),
    path("<int:pk>/delete", views.delete_bookmark_view, name="delete-bookmark"),
]
