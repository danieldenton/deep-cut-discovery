import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Landing from "./components/pages/Landing";
import Saved from "./components/pages/Saved";
import Register from "./components/pages/Register";
import Search from "./components/pages/Search";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/saved/:id" element={<Saved />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
