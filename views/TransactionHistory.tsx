
import React, { useState } from 'react';
import { useAuth } from '../App';
import { TransactionType, TransactionStatus } from '../types';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  Calendar,
  MoreVertical
} from 'lucide-react';

export default function TransactionHistory() {
  const { transactions } = useAuth();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || 
                         tx.category.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || 
                         (filter === 'Income' && tx.type === TransactionType.CREDIT) ||
                         (filter === 'Expense' && tx.type === TransactionType.DEBIT);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Detailed Statement</h2>
            <p className="text-slate-500 text-sm">Review your full activity history across all accounts.</p>
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
            <Download size={18} />
            Export CSV
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by keyword..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent focus:border-indigo-500 rounded-xl text-sm border-2 transition-all outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent focus:border-indigo-500 rounded-xl text-sm border-2 transition-all outline-none appearance-none"
            >
              <option value="All">All Transactions</option>
              <option value="Income">Income Only</option>
              <option value="Expense">Expenses Only</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="date" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border-transparent focus:border-indigo-500 rounded-xl text-sm border-2 transition-all outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Amount</th>
                <th className="px-4 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        tx.type === TransactionType.CREDIT ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {tx.type === TransactionType.CREDIT ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 leading-tight">{tx.description}</p>
                        <p className="text-xs text-slate-400 md:hidden">{new Date(tx.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-sm text-slate-600 whitespace-nowrap">
                    {new Date(tx.timestamp).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-lg tracking-wider">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-slate-700 capitalize">{tx.status.toLowerCase()}</span>
                    </div>
                  </td>
                  <td className={`px-4 py-5 text-right font-bold ${
                    tx.type === TransactionType.CREDIT ? 'text-green-600' : 'text-slate-900'
                  }`}>
                    {tx.type === TransactionType.CREDIT ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-5 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <p className="text-slate-500 font-medium">No transactions match your search</p>
              <button 
                onClick={() => { setSearch(''); setFilter('All'); }}
                className="mt-2 text-indigo-600 text-sm font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
