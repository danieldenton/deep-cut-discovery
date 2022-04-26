import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../partials/Post";

export default function Home({ currentUser, handleDeletePost, setPost }) {
  const [allUsers, setAllUsers] = useState([]);

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
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/`,
          options
        );
        setAllUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const posts = allUsers.map((user) => user.posts).flat();
  const feed = posts.map((post, idx) => {
    return <Post post={post} currentUser={currentUser} />;
  });

  return (
    <div className="home">
      <h1 className="dd">Deep Cut Discovery</h1>
      {feed}
    </div>
  );
}
