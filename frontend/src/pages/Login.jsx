import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

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

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        

      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
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
            Login
          </button>

        </form>

        <p className="mt-4 text-center text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-600 ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;