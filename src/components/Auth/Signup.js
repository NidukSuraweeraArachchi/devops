import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2, Compass, MapPin, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Button from '../common/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      await axios.post(`${apiUrl}/api/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Access to 25+ districts",
    "Exclusive travel deals",
    "Personalized trip planning"
  ];

  return (
    <div className="min-h-[95vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 via-slate-50 to-cyan-50/30" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-rose-100/20 rounded-full blur-3xl" />
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
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-secondary/20 to-orange-50 rounded-2xl mb-6 group cursor-pointer"
          >
            <Compass className="h-10 w-10 text-secondary group-hover:rotate-180 transition-transform duration-700" />
          </motion.div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Create Account</h2>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Join our community of explorers
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-primary/5 to-cyan-50/50 rounded-2xl p-4 space-y-2">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="p-1 bg-primary/10 rounded-full">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <span className="font-medium">{benefit}</span>
            </div>
          ))}
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
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg group-focus-within:bg-secondary/10 transition-colors">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-secondary transition-colors" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-16 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all hover:border-gray-200"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
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
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-50 rounded-lg group-focus-within:bg-rose-50 transition-colors">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-16 pr-4 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-50 focus:border-rose-400 transition-all hover:border-gray-200"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg shadow-xl shadow-secondary/20 bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary-dark hover:to-orange-600 text-black font-black mt-6"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Start Your Journey <ArrowRight className="h-5 w-5 ml-2" />
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
            <span className="px-4 bg-white text-gray-400 font-medium">Already a member?</span>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gray-50 hover:bg-gray-100 rounded-full font-bold text-gray-700 hover:text-primary transition-all"
          >
            <MapPin className="w-4 h-4 text-primary" />
            Sign In to your account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;