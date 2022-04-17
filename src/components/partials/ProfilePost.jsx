import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Tile from "./Tile";

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
    <div className="pro-post">
      <div className="pro-title-tile-text">
        <div className="pro-post-title">
          <h6>{post.title}</h6>
        </div>
        <div className="pro-tile-text">
          <div className="pro-post-tile">
            <a href={post.link} target="_blank">
              <Tile record={{ image: post.image, title: post.title }} />
            </a>
          </div>
          <div className="pro-creator-and-post">
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
              <div className="pro-post-text">
                <p>{post.text}</p>
              </div>
            )}
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
