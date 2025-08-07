import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE from "../constants/api";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ Email: "", Password: "" });

  const changed = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submited = (e) => {
    console.log("From Login");
    e.preventDefault();
    axios
      .post(`${BASE}/login`, data, { withCredentials: true })
      .then((result) => {
        console.log("Login successful:", result);
        localStorage.setItem("username", result.data.username);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("id", result.data.userId);
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Login failed. Please check your credentials and try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submited}
        className="bg-white shadow-md rounded-xl px-8 py-10 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800 border-b pb-2">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please log in to continue.
        </p>

        <div className="mb-4 text-left">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="Email"
            id="Email"
            value={data.Email}
            onChange={changed}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 text-left">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="Password"
            id="Password"
            value={data.Password}
            onChange={changed}
            required
            className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          <Link to="/signup">
            <button
              type="button"
              className="border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-50 transition duration-200 w-full"
            >
              Create Account
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
