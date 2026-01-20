
import React, { useState } from 'react';
import { useAuth } from '../App';
import { TransactionType, TransactionStatus } from '../types';
import { Send, CheckCircle2, AlertCircle, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Transfer() {
  const { user, addTransaction } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [recipientAccount, setRecipientAccount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Transfer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const transferAmount = parseFloat(amount);
    
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return setError('Please enter a valid amount');
    }
    
    if (transferAmount > (user?.balance || 0)) {
      return setError('Insufficient funds for this transfer');
    }

    if (!recipientAccount) {
      return setError('Recipient account is required');
    }

    setIsSubmitting(true);

    // Simulate Network Delay
    setTimeout(() => {
      addTransaction({
        amount: transferAmount,
        type: TransactionType.DEBIT,
        category: category,
        description: `Transfer to ${recipientAccount}: ${description}`,
        status: TransactionStatus.COMPLETED
      });
      
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Transfer Successful!</h2>
        <p className="text-slate-500 mb-8">
          You have successfully sent <strong>${parseFloat(amount).toLocaleString()}</strong> to <strong>{recipientAccount}</strong>.
        </p>
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
          >
            Back to Dashboard
          </button>
          <button 
            onClick={() => { setShowSuccess(false); setAmount(''); setRecipientAccount(''); setDescription(''); }}
            className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
          >
            Make Another Transfer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">New Transfer</h2>
          <p className="text-slate-500 text-sm">Send money to any NovaBank account instantly.</p>
        </div>

        <form onSubmit={handleTransfer} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Recipient Account</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="AC-882199"
                  value={recipientAccount}
                  onChange={(e) => setRecipientAccount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all pr-12"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors">
                  <UserPlus size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Transfer Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all appearance-none"
            >
              <option value="Transfer">External Transfer</option>
              <option value="Family">Family & Friends</option>
              <option value="Business">Business Expense</option>
              <option value="Savings">Savings Goal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Note (Optional)</label>
            <textarea 
              rows={3}
              placeholder="What is this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-indigo-500 rounded-xl outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Confirm Transfer
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 bg-indigo-50 rounded-2xl p-6 border border-indigo-100 flex items-start gap-4">
        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
          <AlertCircle size={20} />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 mb-1">Security Reminder</h4>
          <p className="text-sm text-indigo-700 leading-relaxed">
            NovaBank will never ask for your PIN or password during a transfer. Always verify the recipient's account number before confirming. Large transfers may require additional authorization.
          </p>
        </div>
      </div>
    </div>
  );
}
