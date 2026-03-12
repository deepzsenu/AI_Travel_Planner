import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import trip from "../assets/trip.jpg";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      login(res.data.token);
      navigate("/dashboard");

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${trip})` }}
    >

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-xl w-[420px]">

        <h2 className="text-3xl font-bold text-center mb-2">
          AI Travel Planner
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Plan your perfect trip with AI. Generate smart itineraries,
          estimate travel budgets, and discover amazing destinations
          in seconds.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

        <p className="mt-5 text-center text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-1 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;