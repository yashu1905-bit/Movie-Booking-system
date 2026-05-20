import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Clapperboard, CalendarDays, Ticket, Users, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useLanguageStore } from '../../store/languageStore';
import { cn } from '../../lib/utils';

export default function Sidebar({ isOpen, setIsOpen }) {
  const { logout } = useAuthStore();
  const { platformName, logoUrl } = useSettingsStore();
  const { t } = useLanguageStore();
  
  const navGroups = [
    {
      label: 'DASHBOARD',
      items: [
        { label: 'Analytics', path: '/', icon: LayoutDashboard },
      ]
    },
    {
      label: 'APPS & PAGES',
      items: [
        { label: 'Movies', path: '/movies', icon: Film },
        { label: 'Theaters', path: '/theaters', icon: Clapperboard },
        { label: 'Shows', path: '/shows', icon: CalendarDays },
        { label: 'Bookings', path: '/bookings', icon: Ticket, badge: '2' },
        { label: 'Users', path: '/users', icon: Users },
        { label: 'Settings', path: '/settings', icon: SettingsIcon },
      ]
    }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden transition-opacity" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] bg-white dark:bg-dark-card transform transition-transform duration-300 flex flex-col border-r border-transparent dark:border-dark-border/50 shadow-sm",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center h-[72px] px-6 font-bold text-xl text-slate-800 dark:text-slate-100 tracking-tight shrink-0 overflow-hidden">
          <div className="mr-3 text-primary-500 flex items-center justify-center shrink-0 w-8 h-8">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z" fill="currentColor"/>
                <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z" fill="#161616"/>
                <path opacity="0.06" fillRule="evenodd" clipRule="evenodd" d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z" fill="#161616"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z" fill="url(#paint0_linear)"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="11.8536" y1="16.417" x2="23.5186" y2="-0.6385" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="currentColor" stopOpacity="0.8"/>
                    <stop offset="1" stopColor="currentColor" stopOpacity="0.6"/>
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
          <span className="text-[20px] font-bold text-slate-700 dark:text-slate-200 truncate">{platformName || 'Vuexy'}</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <p className="px-4 text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider">
                {t(group.label)}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between px-4 py-2.5 text-[15px] font-medium rounded-md transition-all duration-200 group",
                        isActive
                          ? "bg-primary-500 text-white shadow-primary"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      )
                    }
                  >
                    <div className="flex items-center">
                      <item.icon className={cn(
                        "w-[22px] h-[22px] mr-3 shrink-0 transition-colors",
                        "[[aria-current='page']_&]:text-white text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                      )} strokeWidth={1.5} />
                      <span className="truncate">{t(item.label)}</span>
                    </div>
                    {item.badge && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 flex items-center justify-center rounded-full font-semibold",
                        "[[aria-current='page']_&]:bg-white [[aria-current='page']_&]:text-primary-600 bg-red-100 text-red-600"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4">
          <button
            onClick={logout}
            className="flex w-full items-center px-4 py-2.5 text-[15px] font-medium rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors group"
          >
            <LogOut className="w-[22px] h-[22px] mr-3 shrink-0 text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200" strokeWidth={1.5} />
            {t('Sign out')}
          </button>
        </div>
      </aside>
    </>
  );
}
