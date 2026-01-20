
import React from 'react';
import { useAuth } from '../App';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Wallet, 
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionType } from '../types';
import { Link } from 'react-router-dom';

// Fix: Add optional key to props type to satisfy TS when component is used in a map
const TransactionRow = ({ tx }: { tx: any, key?: React.Key }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        tx.type === TransactionType.CREDIT ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {tx.type === TransactionType.CREDIT ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
      </div>
      <div>
        <p className="font-semibold text-slate-900">{tx.description}</p>
        <p className="text-xs text-slate-500">{new Date(tx.timestamp).toLocaleDateString()}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-bold ${tx.type === TransactionType.CREDIT ? 'text-green-600' : 'text-slate-900'}`}>
        {tx.type === TransactionType.CREDIT ? '+' : '-'}${tx.amount.toLocaleString()}
      </p>
      <p className="text-xs text-slate-400 capitalize">{tx.status.toLowerCase()}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const { user, transactions } = useAuth();

  const chartData = transactions.slice(0, 7).reverse().map(tx => ({
    name: new Date(tx.timestamp).toLocaleDateString(undefined, { weekday: 'short' }),
    amount: tx.amount
  }));

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <Wallet className="opacity-80" size={24} />
              <CreditCard className="opacity-80" size={24} />
            </div>
            <p className="text-indigo-100 text-sm font-medium mb-1">Available Balance</p>
            <h2 className="text-3xl font-bold mb-6">${user?.balance.toLocaleString()}</h2>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono tracking-widest">**** **** **** 8821</span>
              <span className="text-xs uppercase opacity-70">Nova Premium</span>
            </div>
          </div>
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-[-50px] left-[-20px] w-64 h-64 bg-indigo-400 opacity-20 rounded-full"></div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                <ArrowDownLeft size={18} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider">Incomes</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">$4,250.00</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-green-500 text-sm">
            <TrendingUp size={16} />
            <span>+12.5% this month</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <ArrowUpRight size={18} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider">Expenses</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">$1,842.30</h3>
          </div>
          <div className="mt-4 flex items-center gap-1 text-slate-500 text-sm">
            <Clock size={16} />
            <span>Last 30 days activity</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Account Performance</h3>
            <select className="bg-slate-50 border-none text-sm font-medium rounded-lg px-3 py-1 text-slate-600 outline-none ring-1 ring-slate-200">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
            <Link to="/history" className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:underline">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentTransactions.map(tx => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
            {recentTransactions.length === 0 && (
              <div className="p-10 text-center text-slate-400">
                <History className="mx-auto mb-3 opacity-20" size={48} />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
