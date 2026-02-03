import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/dashboard" className="text-xl font-bold">
        📊 BillBuddy
      </Link>

      {/* Links */}
      <div className="flex gap-6 items-center">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tools">Tools</Link>
        <Link to="/help">Help</Link>
        <Link to="/contact">Contact</Link>

        {/* Profile */}
        <div className="relative group cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 hidden group-hover:block bg-slate-900 rounded shadow-lg p-3 w-40">
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
            <hr className="my-2" />
            <button
              onClick={logoutHandler}
              className="text-red-400 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
