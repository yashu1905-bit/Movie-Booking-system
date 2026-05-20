import { useState, useRef, useEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';
import { useLanguageStore, availableLanguages } from '../../store/languageStore';
import { Menu, Search, Sun, Moon, Bell, Grip, Globe, LogOut, User, Settings as SettingsIcon, Check } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '../../services/apiService';

export default function Header({ toggleSidebar }) {
  const { isDark, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) setIsNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setIsProfileOpen(false);
      if (langRef.current && !langRef.current.contains(event.target)) setIsLangOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: notificationsData = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await notificationsService.getAll();
      return res.data?.data || res.data || [];
    },
    refetchInterval: 30000 // Poll every 30s
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => notificationsService.markRead(id),
    onSuccess: () => queryClient.invalidateQueries(['notifications'])
  });

  const generateDemoMutation = useMutation({
    mutationFn: () => notificationsService.triggerDemo(),
    onSuccess: () => queryClient.invalidateQueries(['notifications'])
  });

  const unreadCount = notificationsData.filter(n => !n.isRead).length;

  return (
    <header className="h-[62px] flex items-center justify-between px-4 bg-white dark:bg-dark-card rounded-xl shadow-sm border border-transparent dark:border-dark-border/50 transition-colors duration-200 mx-4 lg:mx-6 mt-4 z-10 sticky top-4">
      <div className="flex items-center flex-1">
        <button
          onClick={toggleSidebar}
          className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white lg:hidden p-2 -ml-2 rounded-full focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center text-slate-400 w-full max-w-md ml-2 lg:ml-0 gap-2">
          <Search className="w-5 h-5" />
          <input 
            type="text" 
            placeholder={t('Search')} 
            className="bg-transparent border-none outline-none text-[15px] text-slate-600 dark:text-slate-300 placeholder:text-slate-400 w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">

        <div className="relative hidden sm:block" ref={langRef}>
          <button 
            onClick={() => { setIsLangOpen(!isLangOpen); setIsNotificationsOpen(false); setIsProfileOpen(false); }}
            className={`text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-full transition-colors ${isLangOpen ? 'bg-slate-100 dark:bg-slate-800/50' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
          >
            <Globe className="w-5 h-5" strokeWidth={1.5} />
          </button>
          
          {isLangOpen && (
            <Card className="absolute right-0 mt-2 w-48 z-50 animate-in slide-in-from-top-2 overflow-hidden shadow-xl py-2 flex flex-col">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {t('Language')}
              </div>
              {availableLanguages.map(lang => (
                <button 
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm transition-colors w-full text-left ${currentLanguage === lang.code ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 font-medium' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span> {lang.label}
                  {currentLanguage === lang.code && <Check className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </Card>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" strokeWidth={1.5} /> : <Moon className="w-5 h-5" strokeWidth={1.5} />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileOpen(false); setIsLangOpen(false); }}
            className={`text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white p-2 rounded-full transition-colors relative ${isNotificationsOpen ? 'bg-slate-100 dark:bg-slate-800/50' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'}`}
          >
            <Bell className="w-5 h-5" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-dark-card rounded-full animate-pulse"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <Card className="absolute right-0 mt-2 w-80 z-50 animate-in slide-in-from-top-2 overflow-hidden flex flex-col shadow-xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-semibold">{t('Notifications')}</span>
                <span className="text-xs px-2 py-0.5 bg-primary-500/10 text-primary-600 rounded-full">{unreadCount} {t('New')}</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationsData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-6 text-slate-500">
                    <p className="text-sm">{t('Caught up')}</p>
                    <button onClick={() => generateDemoMutation.mutate()} className="text-xs text-primary-500 mt-2 hover:underline">
                      {t('Generate Demo')}
                    </button>
                  </div>
                ) : (
                  notificationsData.map(n => (
                    <div 
                      key={n._id} 
                      onClick={() => !n.isRead && markReadMutation.mutate(n._id)}
                      className={`px-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex justify-between gap-3 ${!n.isRead ? 'bg-primary-50/50 dark:bg-primary-900/10' : 'opacity-75'}`}
                    >
                      <div>
                        <p className={`text-sm ${!n.isRead ? 'font-semibold text-slate-900 dark:text-slate-100' : 'font-medium text-slate-600 dark:text-slate-400'}`}>{n.title}</p>
                        <p className="text-sm text-slate-500 line-clamp-2 mt-0.5 leading-snug">{n.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(n.createdAt).toLocaleDateString()} {new Date(n.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                      {!n.isRead && <div className="w-2 h-2 rounded-full bg-primary-500 mt-1.5 shrink-0" />}
                    </div>
                  ))
                )}
              </div>
              <button 
                className="w-full text-center py-2 text-sm font-medium text-primary-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center"
                onClick={() => { setIsNotificationsOpen(false); navigate('/notifications'); }}
              >
                {t('View all notifications')}
              </button>
            </Card>
          )}
        </div>

        <div className="ml-2 pl-2 relative" ref={profileRef}>
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || user?.firstName || 'Admin'}&background=random`}
            alt="User avatar"
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationsOpen(false); setIsLangOpen(false); }}
            className={`w-[38px] h-[38px] rounded-full object-cover border-2 cursor-pointer transition-colors ${isProfileOpen ? 'border-primary-500' : 'border-transparent hover:border-primary-500'}`}
          />

          {isProfileOpen && (
            <Card className="absolute right-0 mt-2 w-56 z-50 animate-in slide-in-from-top-2 overflow-hidden shadow-xl py-2">
              <div className="px-4 py-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold truncate">{user?.name || t('Administrator')}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@vuexy.com'}</p>
              </div>

              <div className="flex flex-col">
                <button onClick={() => { setIsProfileOpen(false); navigate('/profile'); }} className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors w-full text-left">
                  <User className="w-4 h-4 mr-2" /> {t('My Profile')}
                </button>
                <button onClick={() => { setIsProfileOpen(false); navigate('/settings'); }} className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors w-full text-left">
                  <SettingsIcon className="w-4 h-4 mr-2" /> {t('Settings')}
                </button>
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                <button onClick={() => { setIsProfileOpen(false); logout(); }} className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors w-full text-left">
                  <LogOut className="w-4 h-4 mr-2" /> {t('Sign Out')}
                </button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </header>
  );
}
