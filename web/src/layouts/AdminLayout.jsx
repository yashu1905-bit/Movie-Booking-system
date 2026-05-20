import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f7fa] dark:bg-dark-bg transition-colors duration-200 text-slate-900 dark:text-slate-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex flex-col flex-1 lg:pl-[260px] min-h-screen relative">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="p-4 lg:p-6 flex-1 overflow-auto w-full mt-2">
          <div className="mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 mt-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
