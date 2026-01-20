
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { Mail, Lock, LogIn, ChevronRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulated Authentication
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        setUser({
          uid: 'u1',
          email: 'user@example.com',
          displayName: 'Alex Thompson',
          accountNumber: 'NB-202501002',
          balance: 15420.50,
          currency: 'USD',
          createdAt: new Date()
        });
        navigate('/');
      } else {
        setError('Invalid credentials. Hint: use user@example.com / password');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Visual Side */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">N</div>
            <span className="text-2xl font-bold tracking-tight text-white">NovaBank</span>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Banking built for <br />
            <span className="text-indigo-200">the next generation.</span>
          </h1>
          <p className="text-indigo-100 text-lg max-w-md">
            Experience the future of personal finance with real-time tracking, AI-powered insights, and zero fees.
          </p>
        </div>

        <div className="relative z-10 mt-auto">
          <div className="flex items-center gap-4 text-white opacity-80 mb-4">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <img key={i} className="w-8 h-8 rounded-full border-2 border-indigo-600" src={`https://picsum.photos/32/32?random=${i}`} alt="user" />
              ))}
            </div>
            <span className="text-sm font-medium">+10k people joined this month</span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-50px] left-[10%] w-60 h-60 bg-indigo-400 opacity-20 rounded-full"></div>
      </div>

      {/* Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl">N</div>
            <span className="text-xl font-bold text-slate-800">NovaBank</span>
          </div>
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-semibold border border-red-100">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <Link to="/forgot" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all text-slate-700"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign in to Account
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
