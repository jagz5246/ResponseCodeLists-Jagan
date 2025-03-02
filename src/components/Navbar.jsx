import '../App.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLists } from '../contexts/ListsContext';
import LogoutIcon from '@mui/icons-material/Logout';

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
          <NavLink to="/lists" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Lists</NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Search</NavLink>
          <button onClick={handleLogout} className="logoutBtn"><LogoutIcon /></button>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
