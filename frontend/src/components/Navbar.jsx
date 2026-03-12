import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

  const { token, logout } = useContext(AuthContext);

  const navigate = useNavigate();

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

        {token && (

          <div className="space-x-4">

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
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>

  );

}

export default Navbar;