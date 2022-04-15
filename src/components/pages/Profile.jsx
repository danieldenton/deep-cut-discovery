import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Tile from "../partials/Tile";

export default function Profile({ currentUser, handleLogout }) {
  // PARAMS
  const { id } = useParams();

  let navigate = useNavigate();

  // STATE
  const [ownerName, setOwnerName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [ownerId, setOwnerId] = useState("");
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
        console.log(response.data);
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

  // Deletes pictures corresponding to ID
  const handleDelete = async (faveId) => {
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

  const faveTiles = faves.map((selection, idx) => {
    return (
      <Tile
        key={`fave-link${idx}`}
        selection={{
          image: selection.favorite,
          title: selection.title,
          _id: selection._id,
        }}
        handleDelete={handleDelete}
        showEdit={showEdit}
      />
    );
  });

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
      <div className="fave-tile-container">
        <div>{faveTiles}</div>
      </div>
      {showEdit ? (
        <button id="delete-btn" onClick={() => handleDeleteProfile()}>
          delete profile
        </button>
      ) : null}
    </div>
  );
}
