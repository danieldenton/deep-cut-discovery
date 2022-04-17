import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Landing from "./components/pages/Landing";
import Register from "./components/pages/Register";
import SearchPage from "./components/pages/SearchPage";
import PostForm from "./components/pages/PostForm";
import EditPostForm from "./components/pages/EditPostForm";

export default function App() {
  // STATE
  const [currentUser, setCurrentUser] = useState(null);
  const [value, setValue] = useState("");
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [post, setPost] = useState({});
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
            <Route path="/home" element={<Home currentUser={currentUser} />} />
            <Route
              path="/profile/:id"
              element={
                <Profile
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  showEdit={showEdit}
                  setShowEdit={setShowEdit}
                  setSelectedRecord={setSelectedRecord}
                  selectedRecord={selectedRecord}
                  setPost={setPost}
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
            <Route
              path="/edit"
              element={
                <EditPostForm
                  value={value}
                  setValue={setValue}
                  currentUser={currentUser}
                  post={post}
                />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
