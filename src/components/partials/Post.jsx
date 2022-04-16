import { useState } from "react";
import BigTile from "./BigTile";

export default function Post({
  post,
  profilePost,
  handleDeletePost,
  showEdit,
}) {
  return (
    <div className="post">
      {/* <h6>{post.title}</h6>
      <img src={post.image} alt={post.title} /> */}
      <BigTile post={post} />
      <p>{post.text}</p>
      <a href={post.link}>Listen</a>
    </div>
  );
}
