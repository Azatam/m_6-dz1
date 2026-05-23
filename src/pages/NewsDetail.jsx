import { useLoaderData } from "react-router-dom";

import { Card } from "antd";

export const NewsDetail = () => {
  const { post, comments } = useLoaderData();

  return (
    <div style={{ padding: "20px" }}>
      <Card>
        <h1>{post.title}</h1>

        <p>{post.body}</p>
      </Card>

      <h2 style={{ marginTop: "20px" }}>Comments</h2>

      {comments.map((comment) => (
        <Card key={comment.id} style={{ marginTop: "10px" }}>
          <h4>{comment.user.username}</h4>

          <p>{comment.body}</p>
        </Card>
      ))}
    </div>
  );
};
