import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";
import SearchPage from "./components/pages/SearchPage";
import PostForm from "./components/pages/PostForm";

export default function App() {
  // STATE
  const [currentUser, setCurrentUser] = useState(null);
  const [value, setValue] = useState("");
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showEdit, setShowEdit] = useState(false);

  // USE-EFFECT
  // useEffect that handles localstorage if the user navigates away from the page/refreshes
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    // if a token is found, log the user in; otherwise, make sure they are logged out
    if (token) {
      setCurrentUser(jwt_decode(token));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    // remove the token from local storage
    if (localStorage.getItem("jwt")) localStorage.removeItem("jwt");
    // set the user state to be null
    setCurrentUser(null);
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
      setShowEdit(false);
      setShowEdit(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Router>
        <Layout handleLogout={handleLogout} currentUser={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  setCurrentUser={setCurrentUser}
                  currentUser={currentUser}
                />
              }
            />

            <Route
              path="/register"
              element={
                <Register
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  currentUser={currentUser}
                  handleDeletePost={handleDeletePost}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={
                <Profile
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  handleDeletePost={handleDeletePost}
                  showEdit={showEdit}
                  setShowEdit={setShowEdit}
                />
              }
            />

            <Route
              path="/search"
              element={
                <SearchPage
                  value={value}
                  setValue={setValue}
                  currentUser={currentUser}
                  setSelectedRecord={setSelectedRecord}
                  selectedRecord={selectedRecord}
                />
              }
            />
            <Route
              path="/post"
              element={
                <PostForm
                  value={value}
                  setValue={setValue}
                  currentUser={currentUser}
                  selectedRecord={selectedRecord}
                />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
