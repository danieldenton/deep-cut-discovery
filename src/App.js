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

export default function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/Saved/:id" element={<Saved />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}
