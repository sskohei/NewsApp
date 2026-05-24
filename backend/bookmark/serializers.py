from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import News, Bookmark

User = get_user_model()

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
    
class RegisterSerializer(serializers.ModelSerializer):
    # パスワードは書き込み専用（APIのレスポンスに含めない）にする
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('username','password')

    def create(self, validated_data):
        # ⚠️重要: create_user を使うことでパスワードが自動でハッシュ化されます
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user