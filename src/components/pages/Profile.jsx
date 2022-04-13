import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({ currentUser, handleLogout }) {
  // PARAMS
  const { id } = useParams();

  const [faves, setFaves] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [ownerId, setOwnerId] = useState("");

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
        // console.log(response.data);
        setFaves(response.data.faves);
        setOwnerName(response.data.name);
        setOwnerId(response.data._id);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [showEdit, id]);
  return (
    <div>
      <h1>{ownerName}</h1>
    </div>
  );
}
