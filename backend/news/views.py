from django.shortcuts import render

# Create your views here.
import os
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

@api_view(['GET'])
def search_news(request):
    query = request.GET.get('q', 'technology')

    url = "https://newsapi.org/v2/everything"

    params = {
        "q": query,
        "apiKey": NEWS_API_KEY,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 10,
    }

    res = requests.get(url, params=params)
    data = res.json()

    # 必要なデータだけ返す
    articles = [
        {
            "title": a["title"],
            "description": a["description"],
            "url": a["url"],
            "image": a["urlToImage"],
            "publishedAt": a["publishedAt"],
        }
        for a in data.get("articles", [])
    ]

    return Response(articles)