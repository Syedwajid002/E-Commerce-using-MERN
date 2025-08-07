import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../constants/api";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullName: "",
    Email: "",
    Password: "",
  });

  const submited = (e) => {
    e.preventDefault();
    console.log("Data submitted:", data);
    axios
      .post(`${BASE}/createUser`, data)
      .then((result) => {
        alert("User created! Please login.");
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 px-4">
      <form
        onSubmit={submited}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-600 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Email"
            className="block text-gray-600 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="Email"
            placeholder="example@email.com"
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="Password"
            className="block text-gray-600 font-medium mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="Password"
            placeholder="********"
            onChange={changeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
