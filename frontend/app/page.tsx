"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserData{
  username:string,
}

export default function Home() {
  const router = useRouter();
  const [user,setUser] = useState<UserData|null>(null);
  useEffect(() => {
        const fetchUserProfile = async () => {
        // 💡 ログイン時に保存したトークンを取り出す
        const token = localStorage.getItem('accessToken');

        // トークンがなければログイン画面へ強制送還
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/auth/me/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 💡 ここが超重要！「Bearer 空白 トークン」の形で送ります
                'Authorization': `Bearer ${token}`,
            },
            });

            if (response.ok) {
            const data = await response.json();
            setUser(data);
            } else {
            // トークンの期限切れなどの場合はトークンを消してログインへ
            localStorage.removeItem('accessToken');
            router.push('/login');
            }
        } catch (err) {
            console.error('通信エラー:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchUserProfile();
    }, [router]);

  const [query, setQuery] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading,setLoading] = useState<boolean>(false);

  const search = async () => {
    setLoading(true);
    try{
      const res = await axios.get(
      `http://localhost:8000/api/news/search?q=${query}`
    );
    setArticles(res.data);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-700 p-10 min-h-screen flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Label htmlFor="terms">
            <a href="/">NewsApp</a>
          </Label>
        </div>
          <div className="flex gap-2">
            <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索"
            />
          </div>
          <div className="flex gap-2">
            <Button className="cursor-pointer" onClick={search}>
              検索
            </Button>
            <Button size="icon" className="cursor-pointer">
              <a href="bookmark">★</a>
            </Button>
            <Button>
              {user ? (
                <a href="mypage">マイページ</a>
              ):(
                <a href="login">ログイン</a>
              )}
            </Button>
          </div>
      </div>

      <div>
        {loading && <p>Loding...</p>}

        {!loading &&
          articles.map((a, i) => (
            <div key={i} className="mt-20">
              <Card>
                <CardHeader>
                  <CardTitle>{a.title}</CardTitle>
                  <CardAction>
                    <Button variant="outline" size="icon">☆</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p>{a.description}</p>
                </CardContent>
                <CardFooter>
                  <a href={a.url} target="_blank">記事を見る</a>
                </CardFooter>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
  );
}