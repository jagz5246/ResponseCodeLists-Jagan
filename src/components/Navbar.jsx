import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from 'react';
import { useLists } from '../contexts/ListsContext';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { setLists } = useLists();
  const navigate = useNavigate();

  const handleLogout = async () => {    
    setLists([]);
    await logout();
    localStorage.removeItem("currentUser");
    navigate("/"); // Redirect to login after logout
  };

  return (
    <nav className="navbar">
      <h2>Response Code App</h2>

      {currentUser ? (
        <div className="nav-links">
          <Link to="/lists">Lists</Link>
          <Link to="/search">Search</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
