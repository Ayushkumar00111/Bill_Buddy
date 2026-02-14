import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">BillBuddy</h2>

      <nav className="menu">
        <Link to="/dashboard">📊 Dashboard</Link>
        <Link to="/add-subscription">➕ Add Subscription</Link>
        <Link to="/help">❓ Help</Link>
      </nav>
    </aside>
  );
}
