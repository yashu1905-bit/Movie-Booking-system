import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/themeStore';
import { useEffect } from 'react';

// Layout & Protect
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Movies from './pages/Movies';
import Theaters from './pages/Theaters';
import Shows from './pages/Shows';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

function App() {
  const { initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ className: 'dark:bg-dark-card dark:text-slate-50' }} />
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
