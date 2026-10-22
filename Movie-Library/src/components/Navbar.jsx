
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );

 const logout = () => {
  localStorage.removeItem("loggedInUser");
  navigate("/login", { replace: true });
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Movie<span>Hub</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <button className="nav-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
