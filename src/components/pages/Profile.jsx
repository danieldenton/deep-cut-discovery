import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../css/Profile.css";
import axios from "axios";
import Tile from "../partials/Tile";
import ProfilePost from "../partials/ProfilePost";

export default function Profile({
  currentUser,
  handleLogout,
  setEditMode,
  editMode,
}) {
  // PARAMS
  const { id } = useParams();

  let navigate = useNavigate();

  // STATE
  const [ownerName, setOwnerName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [profilePosts, setProfilePosts] = useState([]);
  const [faves, setFaves] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

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
    setEditMode(false);
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
      setShowEdit(!showEdit);
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

  const userPosts = profilePosts.reverse().map((profilePost, idx) => {
    return (
      <div>
        <ProfilePost
          key={`profile-post${idx}`}
          post={profilePost}
          handleDeletePost={handleDeletePost}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </div>
    );
  });

  const faveTiles = faves.map((fave, idx) => {
    return (
      <div className="fave-tiles">
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
      </div>
    );
  });

  return (
    <div className="profile">
      <h1 className="owner-name">{ownerName}</h1>
      {currentUser ? (
        ownerId === currentUser.id ? (
          <>
            <button className="btn-edit" onClick={() => onButtonClick()}>
              {showEdit ? "done" : "edit"}
            </button>
          </>
        ) : null
      ) : null}
      <div className="profile-posts-and-faves-container">
        <div className="profile-posts-container">
          <div>{userPosts}</div>
        </div>

        <div className="fave-tile-container">
          <div className="fave-label">
            <h6>Favorites</h6>
          </div>
          <div className="fave-tiles-container">{faveTiles}</div>
        </div>
      </div>
      <div>
        {showEdit ? (
          <button id="delete-profile-btn" onClick={() => handleDeleteProfile()}>
            delete profile
          </button>
        ) : null}
      </div>
    </div>
  );
}
