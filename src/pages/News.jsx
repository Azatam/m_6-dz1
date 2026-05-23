import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";

import { Card, Button } from "antd";

import { fetchNews } from "../api/fetchNews";

export const News = () => {
  const [data, setData] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 0;

  useEffect(() => {
    fetchNews(page).then(setData);
  }, [page]);

  if (!data) return <h1>Loading...</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>News</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {data.posts.map((post) => (
          <Card key={post.id}>
            <h2>{post.title}</h2>

            <p>{post.body.slice(0, 100)}...</p>

            <p>Author: {post.userId}</p>

            <Link to={`/news/${post.id}`}>
              <Button type="primary">Open</Button>
            </Link>
          </Card>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <Button
          disabled={page === 0}
          onClick={() =>
            setSearchParams({
              page: page - 1,
            })
          }
        >
          Prev
        </Button>

        <span>Page {page + 1}</span>

        <Button
          onClick={() =>
            setSearchParams({
              page: page + 1,
            })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};
