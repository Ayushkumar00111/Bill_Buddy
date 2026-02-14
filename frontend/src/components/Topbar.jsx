import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <h3>Welcome  {user?.name} </h3>

      {/* <button onClick={logout} className="logout-btn">
        Logout
      </button> */}
      <button onClick={() => navigate("/profile")}>
  Profile
</button>

    </header>
  );
}
