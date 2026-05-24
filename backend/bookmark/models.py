from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class News(models.Model):
    title = models.CharField('news title',max_length=100)
    url = models.URLField(max_length=500)
    def __str__(self):
        return self.title
    
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookmarks')
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='bookmarked_by')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # ユーザーとニュースの組み合わせをユニークにする
        constraints = [
            models.UniqueConstraint(fields=['user', 'news'], name='unique_news_bookmark')
        ]
