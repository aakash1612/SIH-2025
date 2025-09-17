import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgVideo from "../assets/bg.mp4";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // ✅ Hardcoded here

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, {
          email,
          password,
        });

        toast.success("Login Successful ✅");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("Saved token:", res.data.token);


        setTimeout(() => navigate("/"), 1500);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message || "Invalid credentials ❌");
        } else {
          toast.error("Server unreachable. Try again later ❌");
        }
      }
    }
  };

  return (
    <>
      <div className="relative h-screen w-full flex justify-center items-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-5"></div>

        {/* Card */}
        <div className="w-96 p-8 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 relative z-10">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/50">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-blue-600 ml-2">📧</span>
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-800 font-medium mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white/50">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-transparent outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-sm text-blue-600 px-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
                <span className="text-blue-600 ml-2">🔒</span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 bg-white text-gray-900 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
            >
              Login
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-700 mt-4">
            New user?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
