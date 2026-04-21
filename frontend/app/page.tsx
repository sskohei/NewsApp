"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<any[]>([]);

  const search = async () => {
    const res = await axios.get(
      `http://localhost:8000/api/news/search?q=${query}`
    );
    setArticles(res.data);
  };

  return (
    <div className="bg-white text-gray-700 p-10 min-h-screen flex flex-col gap-2">
      <div className="flex gap-2">
        <Label htmlFor="terms">ニュース検索</Label>
      </div>
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワード"
        />
        <Button className="cursor-pointer" onClick={search}>
          検索
        </Button>
      </div>

      <div>
        {articles.map((a, i) => (
          <div key={i} style={{ marginTop: 20 }}>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <a href={a.url} target="_blank">記事を見る</a>
          </div>
        ))}
      </div>
    </div>
  );
}