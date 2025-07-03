import React from 'react';
import Image from 'next/image';
import logo from "../../../../public/authPage/nexus-logo.png"
import rightImg from "../../../../public/authPage/doctor.png"

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center  bg-cover bg-center bg-no-repeat">
      {/* Left Section - Login Form */}
      <div className="w-1/2 flex items-center justify-center  p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src={logo}
              alt="Nexus Logo"
              width={120}
              height={40}
              className="mx-auto"
            /> 
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border-pink-500 border-2">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Log in to your account
            </h1>
            <p className="text-gray-600 mb-6">
              Welcome back! Please enter your details.
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-900 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border text-black border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border text-black border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember Me
                  </label>
                </div>
                <button type="button" className="text-sm text-pink-500 hover:text-pink-600">
                  Forgot password
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                Sign in
              </button>

              <button
                type="button"
                className="w-full border border-gray-200 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                
                Sign in with Google
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{' '}
              <button className="text-pink-500 hover:text-pink-600">Sign up</button>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;