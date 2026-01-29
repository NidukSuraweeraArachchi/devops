import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = ({ onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary rounded-xl transform group-hover:rotate-12 transition-transform duration-300">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter">
                CEYLON<span className="text-primary">EXPLORER</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Destinations</Link>
            <Link to="/about" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors">Our Story</Link>
            {isLoggedIn && userRole === 'admin' && (
              <Link to="/admin" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">Dashboard</Link>
            )}

            <div className="h-6 w-px bg-gray-200 mx-2" />

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-black text-black">
                  {totalItems}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold text-gray-700">Account</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-dark shadow-lg shadow-cyan-900/10 transition-all active:scale-95">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="relative p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-secondary text-[8px] flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-xl">
          <Link to="/" className="block py-2 text-lg font-bold">Destinations</Link>
          <Link to="/about" className="block py-2 text-lg font-bold">Our Story</Link>
          {isLoggedIn && userRole === 'admin' && (
            <Link to="/admin" className="block py-2 text-lg font-bold text-primary">Dashboard</Link>
          )}
          <div className="pt-4 border-t">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full py-3 bg-red-50 text-red-600 rounded-xl font-bold">Logout</button>
            ) : (
              <Link to="/login" className="block w-full py-3 bg-primary text-white text-center rounded-xl font-bold">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;