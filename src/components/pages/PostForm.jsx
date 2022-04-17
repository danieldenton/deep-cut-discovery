import BigTile from "../partials/BigTile";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm({ currentUser, selectedRecord }) {
  let navigate = useNavigate();

  const [postForm, setPostForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      console.log(selectedRecord.title);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/posts`,
        {
          ...postForm,
          creator: currentUser.name,
          image: selectedRecord.cover_image,
          title: selectedRecord.title,
        },
        options
      );
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Post</h1>
      <h6>{selectedRecord.title}</h6>
      <form>
        <BigTile
          record={{
            image: selectedRecord.cover_image,
            title: selectedRecord.title,
          }}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Tell us about this record"
          onChange={(e) => setPostForm({ ...postForm, text: e.target.value })}
        />
        <input
          type="text"
          autoComplete="off"
          placeholder="Share a link where this record can be heard"
          onChange={(e) => setPostForm({ ...postForm, link: e.target.value })}
        />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
