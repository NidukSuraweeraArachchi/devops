import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight, Loader2, Compass } from 'lucide-react';
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

  return (
    <div className="min-h-[95vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#f8fafc]">
        <div className="absolute top-10 right-[-10%] w-[50%] h-[50%] bg-[#006994]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-100/30 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '10s' }} />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white relative z-10 transition-all hover:shadow-cyan-900/10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-yellow-50 rounded-2xl mb-4 group cursor-pointer transition-transform hover:scale-110 duration-500">
            <Compass className="h-10 w-10 text-[#E5A600] group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Join our community of explorers
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 italic">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#006994] transition-colors" />
              <input
                type="text"
                required
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#006994] transition-colors" />
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#006994] transition-colors" />
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
              <input
                type="password"
                required
                className="block w-full pl-12 pr-4 py-3.5 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg shadow-xl shadow-cyan-900/10 mt-4"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Start Journey <ArrowRight className="h-5 w-5 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-bold text-[#006994] hover:text-[#005a82] decoration-2 underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;