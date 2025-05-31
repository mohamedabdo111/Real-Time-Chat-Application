"use client";
import React, { useState } from "react";
import { User, Key, Eye, EyeOff, Mail } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [RegisterState, setRegisterState] = useState({
    username: "",
    email: "",
    Registerpassword: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        loginState.email,
        loginState.password
      );
      setLoginState({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(
        auth,
        RegisterState.email,
        RegisterState.Registerpassword
      );

      await setDoc(doc(db, "users", res.user.uid), {
        userName: RegisterState.username,
        email: RegisterState.email,
        uid: res.user.uid,
        blocked: [],
        createdAt: new Date().toISOString(),
      });

      await setDoc(doc(db, "userChats", res.user.uid), {
        chats: [],
      });

      setRegisterState({
        username: "",
        email: "",
        Registerpassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full flex  justify-around items-center gap-8">
        {/* Login Form - Left Side */}
        <div className="w-[500px]">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className=" rounded-lg p-6 ">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200"
                >
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={loginState.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginState.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-500 hover:bg-blue-600 ${
                  loading && "opacity-50 cursor-not-allowed"
                } text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700`}
              >
                {loading ? "Loading..." : "Login"}
              </button>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full bg-gray-600 border border-gray-500 text-white hover:bg-gray-500 py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full bg-gray-600 border border-gray-500 text-white hover:bg-gray-500 py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Continue with GitHub
                </button>

                <div className="mt-6 text-center block   lg:hidden ">
                  <p className="text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:flex items-center justify-center">
          <div className=" h-96 border"></div>
        </div>

        {/* Register Form - Right Side */}
        <div className="w-[500px] hidden lg:block">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Sign up for a new account</p>
          </div>

          {/* Register Form */}
          <div className=" rounded-lg p-6 ">
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-200"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={RegisterState.username}
                    onChange={handleRegisterChange}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              {/* Register Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="registerEmail"
                  className="text-sm font-medium text-gray-200"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="registerEmail"
                    type="email"
                    name="email"
                    value={RegisterState.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    required
                  />
                </div>
              </div>

              {/* Register Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="registerPassword"
                  className="text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="Registerpassword"
                    name="Registerpassword"
                    type={showPassword ? "text" : "password"}
                    value={RegisterState.Registerpassword}
                    onChange={handleRegisterChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-200"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={RegisterState.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-500 hover:bg-green-600 ${
                  loading && "opacity-50 cursor-not-allowed"
                }  text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-700`}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
