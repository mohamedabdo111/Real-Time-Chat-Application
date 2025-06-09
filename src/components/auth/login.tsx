"use client";
import { User, Key, Eye, EyeOff, Mail } from "lucide-react";

import loginHook from "@/hooks/LoginHook";

const LoginForm = () => {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loginState,
    setLoginState,
    loginError,
    registerError,
    loading,
    setLoginError,
    RegisterState,
    setRegisterState,
    validationLogin,
    handleLoginChange,
    handleRegisterChange,
    handleLoginSubmit,
    handleRegisterSubmit,
  } = loginHook();

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full flex  justify-around items-center gap-8">
        {/* Login Form - Left Side */}
        <div className="w-[500px]">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold   mb-3">Welcome Back</h1>
            <p className=" ">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className=" rounded-lg p-6 ">
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              {/* Email Field */}
              <div className=" mb-3">
                <label htmlFor="email" className="text-sm font-medium ">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={loginState.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2   border border-gray-500  placeholder-gray-400 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    // required
                  />
                </div>
                <p className="text-red-500">{loginError.email}</p>
              </div>

              {/* Password Field */}
              <div className=" mb-3">
                <label htmlFor="password" className="text-sm font-medium  ">
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={loginState.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2   border border-gray-500   placeholder-gray-400 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    // required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2   hover:  transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-red-500">{loginError.password}</p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary-color hover:bg-secondary-color ${
                  loading && "opacity-50 cursor-not-allowed"
                }   font-medium py-2.5 px-4 rounded-md text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700`}
              >
                {loading ? "Loading..." : "Login"}
              </button>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full   border border-gray-500   hover:bg-gray-500 py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full   border border-gray-500   hover:bg-gray-500 py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Continue with GitHub
                </button>

                <div className="mt-6 text-center block   lg:hidden ">
                  <p className="  text-sm">
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
            <h1 className="text-2xl font-bold   mb-3">Create Account</h1>
            <p className=" ">Sign up for a new account</p>
          </div>

          {/* Register Form */}
          <div className=" rounded-lg p-6 ">
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {/* Username Field */}
              <div className=" mb-3">
                <label htmlFor="username" className="text-sm font-medium  ">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={RegisterState.username}
                    onChange={handleRegisterChange}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-3 py-2   border border-gray-500   placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  />
                </div>
                <p className="text-red-500">{registerError.username}</p>
              </div>

              {/* Register Email Field */}
              <div className=" mb-3">
                <label
                  htmlFor="registerEmail"
                  className="text-sm font-medium  "
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="registerEmail"
                    type="email"
                    name="email"
                    value={RegisterState.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2   border border-gray-500   placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  />
                </div>
                <p className="text-red-500">{registerError.email}</p>
              </div>

              {/* Register Password Field */}
              <div className=" mb-3">
                <label
                  htmlFor="registerPassword"
                  className="text-sm font-medium  "
                >
                  Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="Registerpassword"
                    name="Registerpassword"
                    type={showPassword ? "text" : "password"}
                    value={RegisterState.Registerpassword}
                    onChange={handleRegisterChange}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2   border border-gray-500   placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2   hover:  transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-red-500">{registerError.Registerpassword}</p>
              </div>

              {/* Confirm Password Field */}
              <div className=" mb-3">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium  "
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4  " />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={RegisterState.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-2   border border-gray-500   placeholder-gray-400 rounded-md focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2   hover:  transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-red-500">{registerError.confirmPassword}</p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-green-500 hover:bg-green-600 ${
                  loading && "opacity-50 cursor-not-allowed"
                }    font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-700`}
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
