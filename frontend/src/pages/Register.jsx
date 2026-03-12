import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Name"
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center text-sm">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;