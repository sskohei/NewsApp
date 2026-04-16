"use client";

import { useState } from "react";
import axios from "axios";

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
    <div style={{ padding: 20 }}>
      <h1>ニュース検索</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="キーワード"
      />
      <button onClick={search}>検索</button>

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