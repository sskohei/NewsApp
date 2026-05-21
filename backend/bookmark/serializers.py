from rest_framework import serializers
from .models import News, Bookmark

class NewsSerializer(serializers.ModelSerializer):
    is_bookmarked = serializers.SerializerMethodField()

    class Meta:
        model = News
        fields = ['id', 'title', 'url', 'is_bookmarked']

    def get_is_bookmarked(self, obj):
        user = self.context.get('request').user
        if user.is_authenticated:
            return Bookmark.objects.filter(user=user, news=obj).exists()
        return False