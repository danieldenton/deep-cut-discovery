import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import BigTile from "../partials/BigTile";

export default function EditPostForm({ currentUser, post }) {
  let navigate = useNavigate();

  const [editForm, setEditForm] = useState({});

  const submitEditPost = async (postId) => {
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${postId}`,
        editForm,
        options
      );
      navigate(`/profile/${currentUser._id}`);
    } catch (err) {
      console.log(err);
    }

    return (
      <div>
        <h1>Edit</h1>
        <h6>{post.title}</h6>
        <form>
          <BigTile
            record={{
              image: post.cover_image,
              title: post.title,
            }}
          />
          <h7>{post.creator}</h7>
          <input
            type="text"
            autoComplete="off"
            placeholder="Tell us about this record"
            onChange={(e) => setEditForm({ ...editForm, text: e.target.value })}
          />
          <input
            type="text"
            autoComplete="off"
            placeholder="Share a link where this record can be heard"
            onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
          />
          <button
            onClick={() => submitEditPost(post._id)}
            className="btn"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };
}
