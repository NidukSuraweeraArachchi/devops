import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              Travel Guide
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center">
            <Link to="/districts" className="text-gray-300 hover:text-white px-3 py-2">
              Districts
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;