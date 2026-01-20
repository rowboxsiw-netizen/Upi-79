
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Send, 
  History, 
  MessageSquare, 
  User, 
  LogOut, 
  Bell, 
  Search,
  ChevronRight,
  Menu,
  X,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign
} from 'lucide-react';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import Transfer from './views/Transfer';
import TransactionHistory from './views/TransactionHistory';
import AIAssistant from './views/AIAssistant';
import { UserProfile, Transaction, TransactionType, TransactionStatus } from './types';

// Context for Authentication and Global State
interface AuthContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  transactions: Transaction[];
  addTransaction: (tx: Partial<Transaction>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Mock Initial Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', userId: 'u1', amount: 1200, type: TransactionType.CREDIT, category: 'Salary', description: 'Monthly Payroll', timestamp: new Date(Date.now() - 86400000), status: TransactionStatus.COMPLETED },
  { id: '2', userId: 'u1', amount: 45, type: TransactionType.DEBIT, category: 'Food', description: 'Starbucks Coffee', timestamp: new Date(Date.now() - 43200000), status: TransactionStatus.COMPLETED },
  { id: '3', userId: 'u1', amount: 200, type: TransactionType.DEBIT, category: 'Shopping', description: 'Amazon Purchase', timestamp: new Date(Date.now() - 21600000), status: TransactionStatus.COMPLETED },
];

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

// Fix: Make children optional in type to avoid "missing children" error in Route elements
const ProtectedLayout = ({ children }: { children?: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="lg:hidden fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">N</div>
            <span className="text-xl font-bold tracking-tight text-slate-800">NovaBank</span>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
            <SidebarItem to="/transfer" icon={Send} label="Transfer" active={location.pathname === '/transfer'} />
            <SidebarItem to="/history" icon={History} label="Transactions" active={location.pathname === '/history'} />
            <SidebarItem to="/ai-assistant" icon={MessageSquare} label="AI Advisor" active={location.pathname === '/ai-assistant'} />
          </nav>

          <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
            <div className="px-4 py-3 rounded-xl bg-slate-50 flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{user.displayName}</p>
                <p className="text-xs text-slate-500 truncate">{user.accountNumber}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-slate-800">
            {location.pathname === '/' ? 'Dashboard' : 
             location.pathname === '/transfer' ? 'Money Transfer' :
             location.pathname === '/history' ? 'Transaction History' : 'AI Financial Advisor'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-full text-sm border-none focus:ring-2 focus:ring-indigo-500 transition-all w-64"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nova_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nova_tx');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  useEffect(() => {
    if (user) localStorage.setItem('nova_user', JSON.stringify(user));
    else localStorage.removeItem('nova_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nova_tx', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txData: Partial<Transaction>) => {
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.uid || 'guest',
      amount: txData.amount || 0,
      type: txData.type || TransactionType.DEBIT,
      category: txData.category || 'General',
      description: txData.description || '',
      timestamp: new Date(),
      status: TransactionStatus.COMPLETED,
      ...txData
    };
    
    setTransactions(prev => [newTx, ...prev]);
    
    // Update balance
    if (user) {
      const balanceChange = newTx.type === TransactionType.CREDIT ? newTx.amount : -newTx.amount;
      setUser({ ...user, balance: user.balance + balanceChange });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, transactions, addTransaction, logout }}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
          <Route path="/transfer" element={<ProtectedLayout><Transfer /></ProtectedLayout>} />
          <Route path="/history" element={<ProtectedLayout><TransactionHistory /></ProtectedLayout>} />
          <Route path="/ai-assistant" element={<ProtectedLayout><AIAssistant /></ProtectedLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthContext.Provider>
  );
}
