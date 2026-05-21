from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import News, Bookmark

class BookmarkToggleView(views.APIView):
    # ログインユーザーのみ許可
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, news_id):
        news = get_object_or_404(News, id=news_id)
        bookmark, created = Bookmark.objects.get_or_create(user=request.user, news=news)

        if not created:
            # 既に登録されていたら削除（解除）
            bookmark.delete()
            return Response({"status": "unbookmarked"}, status=status.HTTP_204_NO_CONTENT)
        
        # 新規登録
        return Response({"status": "bookmarked"}, status=status.HTTP_201_CREATED)