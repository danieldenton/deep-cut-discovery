import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/home" className="navbar-link">
        Home
      </Link>
      <Link to="/profile/:id" className="navbar-link">
        Profile
      </Link>
      <Link to="/saved/:id" className="navbar-link">
        Saved
      </Link>
      <Link to="/">Log Out</Link>
    </nav>
  );
}
