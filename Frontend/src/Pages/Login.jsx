import React from "react";
import { Link } from "react-router";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/login", formData);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-5 py-10">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">
          <div className="hidden lg:block">
            <h1 className="text-5xl font-bold leading-tight mb-6 ">
              Manage Every Expense With Complete Confidence.
            </h1>
            <p className="tex-gray-500 text-lg leading-8 max-w-xl">
              Access your smart dashboard, track all transactions, view monthly
              reports and get AI-powered saving insights in one place.
            </p>
          </div>

          <div className="max-w-md w-full mx-auto">
            <div className="w-full bg-white  border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold mb-2 ">Welcome Back</h2>
              <p className="text-gray-500 text-lg leading-8 max-w-xl mb-8">
                Login to access your financial dashboard.
              </p>
              <form
                method="post"
                onSubmit={handleSubmit}
                action=""
                className="space-y-5"
              >
                <div>
                  <label htmlFor="" className="text-sm font-medium mb-2 block">
                    Email Adress
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="enter your email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="enter your password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  value="submit"
                  className="w-full bg-[#5b3df5] text-white py-3 rounded-xl font-medium hover:bg-[#4c31db] transition"
                >
                  Login Account
                </button>
                <p className="text-center text-sm text-gray-500 mt-6">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-[#5b3df5] font-medium">
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
