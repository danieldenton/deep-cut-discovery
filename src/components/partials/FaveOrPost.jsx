import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FaveOrPost({
  currentUser,
  selectedRecord,
  value,
  setValue,
}) {
  let navigate = useNavigate();

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
        `${process.env.REACT_APP_SERVER_URL}/api-v1/faves`,
        { favorite: selectedRecord.cover_image, title: selectedRecord.title },
        options
      );

      navigate(`/profile/${currentUser.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const selection = (
    <div className="post-selection-container">
      <img src={selectedRecord.cover_image} alt={selectedRecord.title} />
      <Link to="/post">Create a post</Link>
      <form>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Add to favorites
        </button>
      </form>
    </div>
  );
  // Content to show when there's no selection
  const noSelection = (
    <div className="empty-post-container">
      <p>Select a record from your search results</p>
    </div>
  );

  let selected = selectedRecord.cover_image ? selection : noSelection;

  return (
    <div>
      <h1>Post</h1>
      <div className="post-container">{selected}</div>
    </div>
  );
}
