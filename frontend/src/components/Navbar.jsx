import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null; // login page pe navbar na dikhe

  return (
    <nav className="navbar">
      <h2 className="logo">BillBuddy</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-subscription">Add</Link>
      </div>

      <div className="profile">
        <span>{user?.name || "User"}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

