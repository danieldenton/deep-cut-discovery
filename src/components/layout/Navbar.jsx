import { Link } from "react-router-dom";
export default function Navbar({ handleLogout, currentUser }) {
  return (
    <nav className="navbar">
      {currentUser ? (
        <>
          {/* if the user is logged in */}
          <Link to="/home" className="navbar-link">
            Home
          </Link>
          <Link to="/search" className="navbar-link">
            Search
          </Link>
          <Link to={`/profile/${currentUser.id}`} className="navbar-link">
            My Profile
          </Link>
          <Link to="/" className="navbar-link">
            <span onClick={handleLogout}>Log Out</span>
          </Link>
        </>
      ) : (
        <>
          <Link to={"/login"} className="navbar-link">
            Log In
          </Link>
          <Link to={"/register"} className="navbar-link">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}
