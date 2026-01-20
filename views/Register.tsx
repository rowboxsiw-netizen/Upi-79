
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { User, Mail, Lock, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Registration
    setTimeout(() => {
      setUser({
        uid: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        displayName: formData.name,
        accountNumber: `NB-${Date.now().toString().slice(-8)}`,
        balance: 100.00, // Welcome bonus
        currency: 'USD',
        createdAt: new Date()
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-4xl w-full flex bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
        {/* Info Column */}
        <div className="hidden lg:flex w-2/5 bg-indigo-600 p-12 flex-col justify-between text-white relative">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl">N</div>
              <span className="text-xl font-bold">NovaBank</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Open your smart account in minutes.</h2>
            <ul className="space-y-4">
              {[
                "Instant approval & virtual card",
                "Advanced AI spending insights",
                "Free global money transfers",
                "256-bit encryption security"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-indigo-100 text-sm">
                  <ShieldCheck size={18} className="text-white" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-widest opacity-60 mb-2">Welcome Reward</p>
            <p className="text-lg font-bold">Get $100 bonus on your first deposit over $500.</p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Form Column */}
        <div className="flex-1 p-8 md:p-12 lg:p-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
            <p className="text-slate-500">Join thousands of smart savers today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all"
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" size={20} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all"
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
