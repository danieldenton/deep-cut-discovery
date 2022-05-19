import { useState } from "react";
import axios from "axios";
import Tile from "./Tile";

export default function ProfilePost({
  post,
  handleDeletePost,
  showEdit,
  setShowEdit,
  editMode,
  setEditMode,
}) {
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
      setShowEdit(!showEdit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="pro-post">
      <div className="separate-btns">
        <div className="pro-post-title">
          <h6>{post.title}</h6>
        </div>
        <div className="pro-tile-text">
          <div className="pro-post-tile">
            <a href={post.link} target="_blank">
              <Tile record={{ image: post.image, title: post.title }} />
            </a>
          </div>
          <div className="pro-btn-and-post">
            {editMode ? (
              <form>
                <input
                  className="edit-input"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setEditPostForm({ text: e.target.value })}
                />
                <button
                  onClick={(e) => handleSubmitEdit(e, post._id)}
                  className="edit-delete-btn"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="pro-post-text">
                <p>{post.text}</p>
                <div className="edit-del-btns">
                  {showEdit ? (
                    <>
                      <button
                        onClick={() => setEditMode(!editMode)}
                        className="edit-delete-btn"
                      >
                        {editMode ? "done" : "edit"}
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="edit-delete-btn"
                      >
                        delete
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
