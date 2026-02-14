import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "50px auto",
      padding: "30px",
      background: "#1f2937",
      borderRadius: "12px",
      color: "white"
    }}>
      <h2 style={{ marginBottom: "20px" }}>My Profile</h2>

      <div style={{ marginBottom: "15px" }}>
        <strong>Name:</strong>
        <p>{user?.name}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <strong>Email:</strong>
        <p>{user?.email}</p>
      </div>

      <button
        onClick={logout}
        style={{
          padding: "10px 20px",
          background: "#ef4444",
          border: "none",
          borderRadius: "6px",
          color: "white",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}
