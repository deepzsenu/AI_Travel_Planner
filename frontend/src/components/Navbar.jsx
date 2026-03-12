import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-blue-600">
          AI Travel Planner
        </h1>

        {/* Desktop Menu */}
        {token && (
          <div className="hidden md:flex space-x-4 items-center">

            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              to="/create-trip"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Trip
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>

          </div>
        )}

        {/* Mobile Menu Button */}
        {token && (
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        )}

      </div>

      {/* Mobile Menu */}
      {menuOpen && token && (
        <div className="md:hidden px-6 pb-4 space-y-3">

          <Link
            to="/dashboard"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/create-trip"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={() => setMenuOpen(false)}
          >
            Create Trip
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;