import Tile from "../partials/Tile";
import "../../css/PostForm.css";
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
      console.log(currentUser);
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/posts`,
        {
          ...postForm,
          creator: currentUser.name,
          creatorId: currentUser.id,
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
    <div className="post-page">
      <div className="post-box">
        <h6 className="post-page-title">{selectedRecord.title}</h6>
        <div className="post-tile-input">
          <div className="post-page-form-tile">
            <Tile
              record={{
                image: selectedRecord.cover_image,
                title: selectedRecord.title,
              }}
            />
          </div>
          <form className="post-page-form">
            <div>
              <div>
                <label>Tell us about this record.</label>
              </div>
              <input
                className="post-page-text-input"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setPostForm({ ...postForm, text: e.target.value })
                }
              />
            </div>
            <div>
              <div>
                <label>Share a link where someone could hear it.</label>
              </div>
              <input
                className="post-page-form-link"
                type="text"
                autoComplete="off"
                onChange={(e) =>
                  setPostForm({ ...postForm, link: e.target.value })
                }
              />
            </div>
            <button onClick={handleSubmit} className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
