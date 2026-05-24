from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import BookmarkToggleView,RegisterView

urlpatterns = [
    # 例: /api/news/5/bookmark/ にPOSTリクエストを送ると登録/解除ができる
    path('news/<int:news_id>/bookmark/', BookmarkToggleView.as_view(), name='bookmark-toggle'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]