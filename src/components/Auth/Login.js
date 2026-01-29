import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, Globe, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Button from '../common/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-yellow-50/20" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-rose-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white/50 relative z-10"
      >
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-cyan-50 rounded-2xl mb-6 group cursor-pointer"
          >
            <Globe className="h-10 w-10 text-primary group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Welcome Back</h2>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            Continue your journey across Sri Lanka
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg group-focus-within:bg-primary/10 transition-colors">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-16 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all hover:border-gray-200"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg group-focus-within:bg-primary/10 transition-colors">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-16 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all hover:border-gray-200"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 hover:text-gray-900 cursor-pointer font-medium">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-primary hover:text-primary-dark">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg shadow-xl shadow-primary/20 bg-gradient-to-r from-primary to-cyan-600 hover:from-primary-dark hover:to-cyan-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Login to Explorer <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-400 font-medium">New to Ceylon Explorer?</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-50 hover:bg-gray-100 rounded-full font-bold text-gray-700 hover:text-primary transition-all"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            Create an account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;