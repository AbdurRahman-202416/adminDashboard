import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpeg";


const Login = () => {
  return (
    <div className="py-16 bg-[#F4FFC3]">
      <div className="flex flex-col lg:flex-row bg-[#F4FFC3] rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {/* Image Section */}
        <div
          className="lg:w-1/2 bg-cover h-64 lg:h-auto"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>

        {/* Login Form Section */}
        <div className="w-full p-8 lg:w-1/2">
          <img className="w-full h-[60px]" src={Logo} alt="Logo" />
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
         
        
          {/* Email Input */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
            />
          </div>
          {/* Password Input */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
            />
          </div>
          {/* Login Button */}
          <div className="mt-8">
            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
              Login
            </button>
          </div>
          {/* Sign Up Link */}
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to={"/signup"} className="text-xs  text-indigo-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
