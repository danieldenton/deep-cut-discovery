import { useState } from "react";

export default function Post({
  post,
  profilePost,
  handleDeletePost,
  showEdit,
}) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <img src={post.image} alt={post.title} />
      <p>{post.text}</p>
      <p>{post.link}</p>
    </div>
  );
}
