import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BigTile from "./BigTile";

export default function Post({ post, handleDeletePost, showEdit }) {
  const [editMode, setEditMode] = useState(false);
  const [editPostForm, setEditPostForm] = useState({});

  const handleSubmitEdit = async (e, postId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${postId}`,
        {
          text: editPostForm,
        },
        options
      );

      setEditMode(!editMode);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="post">
      <div className="title-tile-text">
        <div className="post-title">
          <h6>{post.title}</h6>
        </div>
        <div className="tile-text">
          <div className="post-tile">
            <a href={post.link} target="_blank">
              <BigTile record={{ image: post.image, title: post.title }} />
            </a>
          </div>
          <div className="creator-and-post">
            {editMode ? (
              <form>
                <input
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setEditPostForm({ text: e.target.value })}
                />
                <button
                  onClick={(e) => handleSubmitEdit(e, post._id)}
                  className="btn"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="post-text">
                <p>{post.text}</p>
              </div>
            )}
            <Link to={`/profile/${post.creatorId}`} className="post-creator">
              {post.creator}
            </Link>
          </div>
        </div>
      </div>

      {showEdit ? (
        <>
          <button onClick={() => setEditMode(!editMode)} className="delete-btn">
            {editMode ? "done editing" : "edit"}
          </button>
          <button
            onClick={() => handleDeletePost(post._id)}
            className="delete-btn"
          >
            Delete
          </button>
        </>
      ) : null}
    </div>
  );
}
