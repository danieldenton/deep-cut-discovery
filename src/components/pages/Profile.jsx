import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tile from "../partials/Tile";
import Post from "../partials/Post";

export default function Profile({
  currentUser,
  handleLogout,
  showEdit,
  setShowEdit,
}) {
  // PARAMS
  const { id } = useParams();

  let navigate = useNavigate();

  // STATE
  const [ownerName, setOwnerName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [profilePosts, setProfilePosts] = useState([]);
  const [faves, setFaves] = useState([]);

  // USE-EFFECT
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("jwt");
        // console.log(token);
        const options = {
          headers: {
            Authorization: token,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${id}`,
          options
        );
        setProfilePosts(response.data.posts);
        setFaves(response.data.faves);
        setOwnerName(response.data.name);
        setOwnerId(response.data._id);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [showEdit, id]);

  // Toggles delete buttons
  const onButtonClick = () => {
    setShowEdit(!showEdit);
  };

  // deletes a post with corresponding to ID from user profile
  const handleDeleteFave = async (faveId) => {
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/faves/${faveId}`,
        options
      );
      setShowEdit(false);
      setShowEdit(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/posts/${postId}`,
        options
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const options = {
        headers: {
          Authorization: token,
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api-v1/users/${currentUser.id}`,
        options
      );
      handleLogout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const userPosts = profilePosts.map((profilePost, idx) => {
    return (
      <div>
        <Post
          key={`profile-post${idx}`}
          post={profilePost}
          handleDeletePost={handleDeletePost}
          showEdit={showEdit}
        />
      </div>
    );
  });

  const faveTiles = faves.map((fave, idx) => {
    return (
      <Tile
        key={`fave-link${idx}`}
        record={{
          image: fave.image,
          title: fave.title,
          _id: fave._id,
        }}
        handleDeleteFave={handleDeleteFave}
        showEdit={showEdit}
      />
    );
  });

  return (
    <div>
      <h1>{ownerName}</h1>
      {currentUser ? (
        ownerId === currentUser.id ? (
          <>
            <button className="btn-edit" onClick={() => onButtonClick()}>
              {showEdit ? "done editing" : "edit"}
            </button>
          </>
        ) : null
      ) : null}
      <div className="profile-posts-and-faves-container">
        <div className="profile-posts-container">
          <div>{userPosts}</div>
        </div>

        <div className="fave-tile-container">
          <div>{faveTiles}</div>
        </div>
      </div>
      {showEdit ? (
        <button id="delete-profile-btn" onClick={() => handleDeleteProfile()}>
          delete profile
        </button>
      ) : null}
    </div>
  );
}
