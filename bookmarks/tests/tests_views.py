from django.test import TestCase
from bookmarks.models import Bookmark, Folder
from django.urls import reverse


class BookmarkListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):

        folder1 = Folder.objects.create(name="Folder11")
        folder2 = Folder.objects.create(name="Folder2")
        alphabets = ["A", "B", "C", "D", "E"]

        for alphabet in alphabets[:2]:
            Bookmark.objects.create(
                name=f"{alphabet} Bookmark",
                description="Sample description",
                url="https://google.co.in",
                folder=folder1,
            )

        for alphabet in alphabets[2:]:
            Bookmark.objects.create(
                name=f"{alphabet} Bookmark",
                description="Sample description",
                url="https://google.co.in",
                folder=folder2,
            )

    def test_view_url_exists_at_desired_location(self):
        response = self.client.get("/bookmarks/")
        self.assertEqual(response.status_code, 200)

    def test_url_accessible_by_name(self):
        response = self.client.get(reverse("bookmarks"))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse("bookmarks"))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "bookmarks/bookmark_list.html")

    def test_filter_by_ascending(self):
        response = self.client.get(reverse("bookmarks") + "?sort_by=ascending")
        self.assertEqual(response.context["filter"].qs[0].name, "A Bookmark")
        self.assertEqual(response.context["filter"].qs[1].name, "B Bookmark")

    def test_filter_by_descending(self):
        response = self.client.get(reverse("bookmarks") + "?sort_by=descending")
        self.assertEqual(response.context["filter"].qs[0].name, "E Bookmark")
        self.assertEqual(response.context["filter"].qs[1].name, "D Bookmark")

    def test_filter_by_name_contains(self):
        response = self.client.get(reverse("bookmarks") + "?name__icontains=B+Bookmark")
        self.assertEqual(response.context["filter"].qs[0].name, "B Bookmark")

    def test_filter_by_folder(self):
        response = self.client.get(
            reverse("bookmarks") + "?folder=Folder1&sort_by=ascending"
        )
        self.assertEqual(response.context["filter"].qs[0].name, "A Bookmark")
        self.assertEqual(response.context["filter"].qs[1].name, "B Bookmark")

        self.assertNotEqual(response.context["filter"].qs[0].name, "C Bookmark")
