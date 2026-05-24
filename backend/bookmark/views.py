from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import News, Bookmark
from .serializers import RegisterSerializer

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
    
class RegisterView(views.APIView):
    # ログインしていないゲストユーザーでもアクセスできるようにする
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"}, 
                status=status.HTTP_201_CREATED
            )
        # バリデーションエラー（ユーザー名重複など）があればエラー内容を返す
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
