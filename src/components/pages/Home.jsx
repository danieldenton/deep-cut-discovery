import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../partials/Post";

export default function Home({ currentUser, handleDeletePosts }) {
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
        console.log(response.data);
        setAllUsers(response.data);
        console.log(allUsers);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const posts = allUsers.map((user) => user.posts).flat();
  console.log(posts);
  const feed = posts.map((post, idx) => {
    return (
      <div className="post">
        <h6>{post.title}</h6>
        <img src={post.image} alt={post.title} />
        <p>{post.text}</p>
        <a href={post.link}>Listen</a>
      </div>
    );
  });

  return (
    <div className="home">
      <h1>Home</h1>
      {feed}
    </div>
  );
}
