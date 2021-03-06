import { Navigate } from "react-router-dom";
import { useState } from "react";
import "../../css/Register.css";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Register({ currentUser, setCurrentUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });
  const [msg, setMsg] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (form.password === form.passwordCheck) {
      // remove unneeded data in the form pre-request
      delete form.passwordCheck;
      try {
        const response = await axios.post(
          process.env.REACT_APP_SERVER_URL + "/api-v1/users/register",
          form
        );
        const { token } = response.data;
        localStorage.setItem("jwt", token);
        const decoded = jwt_decode(token);
        setCurrentUser(decoded);
      } catch (err) {
        if (err.response.status === 409) {
          setMsg(err.response.data.msg);
        }
        console.log(err);
      }
    } else setMsg("passwords do not match");
  };

  if (currentUser) return <Navigate to="/home" />;

  return (
    <div className="sign-up-background">
      <form onSubmit={handleFormSubmit}>
        <div className="signup-column">
          <div>
            <label htmlFor="name" className="signup-label">
              Name
            </label>
          </div>
          <div>
            <input
              className="signup-input"
              type="text"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="signup-label">
              Email
            </label>
          </div>
          <div>
            <input
              className="signup-input"
              type="email"
              autoComplete="off"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="signup-label">
              Password
            </label>
          </div>
          <div>
            <input
              className="signup-input"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              value={form.password}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordCheck" className="signup-label">
              Confirm Password
            </label>
          </div>
          <div>
            <input
              className="signup-input"
              type="password"
              onChange={(e) =>
                setForm({ ...form, passwordCheck: e.target.value })
              }
              value={form.passwordCheck}
              required
            />
          </div>
          <button className="signup-btn" type="submit">
            Create My Account
          </button>
        </div>
      </form>
      <p className="msg">{msg ? `${msg}` : ""}</p>
    </div>
  );
}
