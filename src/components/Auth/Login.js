import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, Loader2, Globe } from 'lucide-react';
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
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[#f8fafc]">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-yellow-100/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-cyan-50 rounded-2xl mb-4 group cursor-pointer transition-transform hover:scale-110 duration-500">
            <Globe className="h-10 w-10 text-[#006994] group-hover:rotate-12 transition-transform" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">
            Log in to continue your journey across Sri Lanka
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-hover:text-[#006994] transition-colors" />
              <input
                type="email"
                required
                className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all hover:border-gray-200"
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
                className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl text-gray-900 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-50 focus:border-[#006994] transition-all hover:border-gray-200"
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
                className="h-4 w-4 text-[#006994] focus:ring-[#006994] border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold text-[#006994] hover:text-[#005a82]">
                Forgot password?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-4 text-lg shadow-xl shadow-cyan-900/20"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <>
                Login to Explorer <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-[#006994] hover:text-[#005a82] decoration-2 underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;