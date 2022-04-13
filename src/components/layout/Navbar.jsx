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
          <Link to="/discover" className="navbar-link">
            Discover
          </Link>
          <Link to={`/profiles/${currentUser.id}`} className="navbar-link">
            My Profile
          </Link>
          <Link to="/" className="navbar-link">
            <span onClick={handleLogout}>Log Out</span>
          </Link>
        </>
      ) : (
        <></>
      )}
    </nav>
  );
}
