import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import trip from "../assets/trip.jpg";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });

      navigate("/");

    } catch (error) {

      alert("Registration failed");

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
          Create Account
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Start planning smarter trips with AI-powered travel
          recommendations, personalized itineraries, and
          intelligent budget estimates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Full Name"
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setName(e.target.value)}
          />

          <input
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
            Register
          </button>

        </form>

        <p className="mt-5 text-center text-sm">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-1 font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;