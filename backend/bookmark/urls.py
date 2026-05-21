from django.urls import path
from .views import BookmarkToggleView

urlpatterns = [
    # 例: /api/news/5/bookmark/ にPOSTリクエストを送ると登録/解除ができる
    path('news/<int:news_id>/bookmark/', BookmarkToggleView.as_view(), name='bookmark-toggle'),
]