import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@moviebooking.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { email, password });
      
      // Backend returns { status, data: { user, token }, message }
      const token = res.data?.token || res.data?.accessToken;
      const user = res.data?.user || res.data;
      
      login(user, token);
      toast.success(res.message || 'Login successful');
      navigate('/');
    } catch (err) {
      console.error('Login failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-dark-card rounded-xl shadow-lg border border-slate-200 dark:border-dark-border p-8 text-center transition-all duration-200 hover:shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">Movie Admin</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to access the dashboard</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-border dark:bg-dark-bg dark:text-slate-50"
            placeholder="Admin Email"
          />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex h-12 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-dark-border dark:bg-dark-bg dark:text-slate-50"
            placeholder="Password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-primary disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
