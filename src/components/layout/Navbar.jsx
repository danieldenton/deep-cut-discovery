import { Link } from "react-router-dom";
export default function Navbar({ handleLogout, currentUser }) {
  const loggedIn = (
    <>
      {/* if the user is logged in */}
      <Link to="/home" className="navbar-link">
        Home
      </Link>
      <Link to="/discover" className="navbar-link">
        Discover
      </Link>
      {currentUser ? (
        <Link to={`/profiles/${currentUser.id}`} className="nav-link">
          My Profile
        </Link>
      ) : null}
      const loggedOut = (<></>)
      <Link to="/" className="nav-link">
        <span onClick={handleLogout}>Log Out</span>
      </Link>
    </>
  );

  const loggedOut = <></>;
  return <nav className="navbar">{currentUser ? loggedIn : loggedOut}</nav>;
}
