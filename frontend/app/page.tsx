"use client";

import { useState } from "react";
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


export default function Home() {
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
              <a href="login">ログイン</a>
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