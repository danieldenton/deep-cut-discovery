import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Login({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // post to the backend with the form data to log in
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/api-v1/users/login",
        form
      );
      const { token } = response.data; // from res.json({}) in the server
      // save the token in localstorage
      localStorage.setItem("jwt", token);
      // decode the token that is sent to use
      const decoded = jwt_decode(token);
      // set the app state to the logged in user
      setCurrentUser(decoded);
    } catch (err) {
      // handle errors such as wrong credentials
      if (err.response.status === 400) {
        setMsg(err.response.data.msg);
      }
      console.log(err);
    }
  };

  // navigate to the user's profile if currentUser is not null
  if (currentUser) return <Navigate to="/home" />;

  return (
    <div className="login">
      <Link to={"/"} className="back-link">
        Back
      </Link>
      <form onSubmit={handleFormSubmit}>
        <div className="login-column">
          <label className="login-label" htmlFor="email">
            email
          </label>
          <input
            className="login-input"
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />

          <label className="login-label" htmlFor="password">
            password
          </label>
          <input
            className="login-input"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />

          <button className="btn" type="submit">
            log In
          </button>
          <p className="msg">{msg ? `${msg}` : ""}</p>
        </div>
        <div className="sign-up-column">
          <p>Don't have an account?</p>
          <Link to="/register" className="register">
            Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}
