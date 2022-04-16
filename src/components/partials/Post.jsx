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
      <h6>{post.title}</h6>
      <BigTile record={{ image: post.image, title: post.title }} />
      <p>{post.text}</p>
      <a href={post.link} target="_blank">
        Listen
      </a>
      {showEdit ? (
        <>
          <button
          // onClick={handleEditPost} className="edit-btn"
          >
            Edit
          </button>
          <button onClick={() => handleDeletePost()} className="delete-btn">
            Delete
          </button>
        </>
      ) : null}
    </div>
  );
}
