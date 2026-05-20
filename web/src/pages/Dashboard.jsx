import { MoreVertical } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services/apiService';
import { useLanguageStore } from '../store/languageStore';

export default function Dashboard() {
  const { t } = useLanguageStore();
  const { data: stats = { 
    users: '-', movies: '-', theaters: '-', shows: '-', bookings: '-', 
    totalRevenue: 0, earningReports: [] 
  } } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const res = await analyticsService.getStats();
      return res.data || res;
    }
  });
  return (
    <div className="space-y-6">
      {/* Top Row Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-6">
        {/* Sales Card */}
        <Card className="p-5 sm:col-span-1 xl:col-span-2 flex flex-col relative overflow-hidden">
          <div className="flex-1">
            <h3 className="text-[17px] font-semibold text-slate-700 dark:text-slate-200">{t('Total Users')}</h3>
            <p className="text-[14px] text-slate-500 mb-4 font-medium">{t('Registered Accounts')}</p>
          </div>
          <div className="mt-auto">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-[32px] font-semibold leading-[1.2] text-slate-600 dark:text-slate-100">{stats.users}</span>
              <span className="text-[13px] font-medium text-[#28c76f] mt-1 mb-1">{t('+ Active')}</span>
            </div>
            {/* Fake SVG Line */}
            <div className="h-20 w-fit sm:w-full mt-6 -mx-5 -mb-5">
              <svg viewBox="0 0 100 40" className="w-full h-full text-[#28c76f] stroke-current preserve-aspect-ratio-none" preserveAspectRatio="none">
                <path d="M0 30 Q 25 10 50 30 T 100 10 L 100 40 L 0 40 Z" fill="currentColor" fillOpacity="0.08" strokeWidth="2"/>
                <path d="M0 30 Q 25 10 50 30 T 100 10" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
        </Card>

        {/* Sessions Card */}
        <Card className="p-5 sm:col-span-1 xl:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-[17px] font-semibold text-slate-700 dark:text-slate-200">{t('Total Movies')}</h3>
            <p className="text-[14px] text-slate-500 mb-2 font-medium">{t('In Database')}</p>
          </div>
          <div className="flex-1 flex items-end justify-between h-16 my-5 px-1 gap-1">
            {[40, 70, 45, 90, 60, 40, 75].map((h, i) => (
              <div key={i} className={`w-2.5 rounded-full ${i===3 ? 'bg-primary-500 shadow-primary/30 shadow-md' : 'bg-primary-500/20'} transition-all`} style={{height: `${h}%`}}></div>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[32px] font-semibold leading-[1.2] text-slate-600 dark:text-slate-100">{stats.movies}</span>
            <span className="text-[13px] font-medium text-[#28c76f] mb-1">{t('Titles')}</span>
          </div>
        </Card>

        {/* Small Cards */}
        <Card className="p-5 sm:col-span-1 xl:col-span-2 flex flex-col justify-center items-center text-center pb-6">
          <div className="w-11 h-11 rounded-full bg-red-100 text-[#ea5455] dark:bg-red-500/10 flex items-center justify-center mb-3">
            <span className="font-semibold text-xl">🏢</span>
          </div>
          <p className="text-[15px] font-semibold text-slate-700 dark:text-slate-200">{t('Total Theaters')}</p>
          <p className="text-[13px] text-slate-500 mb-3">{t('Active Locations')}</p>
          <h4 className="text-[22px] font-semibold text-slate-700 dark:text-slate-100 mb-1">{stats.theaters}</h4>
          <span className="text-[13px] font-medium text-[#28c76f] dark:text-[#28c76f]">{t('Operational')}</span>
        </Card>

        <Card className="p-5 sm:col-span-1 xl:col-span-2 flex flex-col justify-center items-center text-center pb-6">
          <div className="w-11 h-11 rounded-full bg-cyan-100 text-[#00cfe8] dark:bg-cyan-500/10 flex items-center justify-center mb-3">
            <span className="font-semibold text-lg">🎬</span>
          </div>
          <p className="text-[15px] font-semibold text-slate-700 dark:text-slate-200">{t('Total Shows')}</p>
          <p className="text-[13px] text-slate-500 mb-3">{t('Scheduled')}</p>
          <h4 className="text-[22px] font-semibold text-slate-700 dark:text-slate-100 mb-1">{stats.shows}</h4>
          <span className="text-[13px] font-medium text-[#28c76f]">{t('Global')}</span>
        </Card>

        {/* Revenue Growth */}
        <Card className="p-5 sm:col-span-2 xl:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="text-[17px] font-semibold text-slate-700 dark:text-slate-200">{t('Total Bookings')}</h3>
            <p className="text-[14px] text-slate-500 mb-6 font-medium">{t('Lifetime Reservations')}</p>
          </div>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-[32px] font-semibold text-slate-600 dark:text-slate-100">{stats.bookings}</h2>
              <span className="text-[13px] font-medium inline-block mt-1 px-2.5 py-0.5 rounded-sm bg-green-100 text-[#28c76f] dark:bg-green-500/10 dark:text-[#28c76f]">{t('Confirmed')}</span>
            </div>
            {/* Fake SVG Bars */}
            <div className="flex gap-2.5 h-24 items-end pb-2">
               {[20, 35, 50, 75, 100, 85, 40].map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-3.5 rounded-t-sm ${i===4 ? 'bg-[#28c76f] shadow-md shadow-[#28c76f]/30' : 'bg-slate-100 dark:bg-slate-800'} transition-all`} style={{height: `${h}%`}}></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-end gap-3.5 text-[12px] text-slate-400/80 font-semibold uppercase px-1">
             <span className="w-3.5 text-center">M</span>
             <span className="w-3.5 text-center">t</span>
             <span className="w-3.5 text-center">w</span>
             <span className="w-3.5 text-center">t</span>
             <span className="w-3.5 text-center">f</span>
             <span className="w-3.5 text-center">s</span>
             <span className="w-3.5 text-center">s</span>
          </div>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[18px] font-semibold text-slate-700 dark:text-slate-200 mb-1">{t('Earning Reports')}</h3>
              <p className="text-[14px] text-slate-500">{t('Yearly Earnings Overview')}</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5"/></button>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="border border-primary-500 rounded-xl px-4 py-4 flex flex-col items-center shadow-[0_4px_14px_0_rgba(115,103,240,0.39)] bg-white dark:bg-dark-card min-w-[100px] cursor-pointer">
              <div className="p-2.5 bg-primary-100 dark:bg-primary-500/20 rounded-lg mb-2 text-primary-500 font-bold">💰</div>
              <span className="text-[17px] font-bold text-slate-700 dark:text-slate-100">${stats.totalRevenue?.toLocaleString() || 0}</span>
              <span className="text-[13px] font-medium text-slate-500 mt-1">{t('Earnings')}</span>
            </div>
            <div className="border border-slate-200 dark:border-dark-border border-dashed rounded-xl px-4 py-4 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors min-w-[100px]">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg mb-2 text-slate-500 font-bold">🛒</div>
              <span className="text-[17px] font-bold text-slate-700 dark:text-slate-100">{stats.bookings?.toLocaleString() || 0}</span>
              <span className="text-[13px] font-medium text-slate-500 mt-1">{t('Sales')}</span>
            </div>
            <div className="border border-slate-200 dark:border-dark-border border-dashed rounded-xl px-4 py-4 flex flex-col items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors min-w-[100px] hidden sm:flex">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg mb-2 text-slate-500 font-bold">🎬</div>
              <span className="text-[17px] font-bold text-slate-700 dark:text-slate-100">{stats.shows?.toLocaleString() || 0}</span>
              <span className="text-[13px] font-medium text-slate-500 mt-1">{t('Shows')}</span>
            </div>
          </div>
          {/* Earning Chart */}
          <div className="h-[250px] flex items-end justify-between px-2 w-full gap-2 lg:gap-8 overflow-x-auto">
             {(stats.earningReports?.length ? stats.earningReports : [
               { m: 'Jan', h: 45 }, { m: 'Feb', h: 30 }, { m: 'Mar', h: 90, active: true },
               { m: 'Apr', h: 75 }, { m: 'May', h: 25 }, { m: 'Jun', h: 60 }
             ]).map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-3 w-full group relative" title={`$${bar.rawValue || 0}`}>
                  <div className="relative w-full flex justify-center h-[200px] items-end pt-8">
                    {/* Y Axis Grid Guidelines simulation implied */}
                    <div className={`w-full min-w-[12px] max-w-[28px] rounded-t-md ${bar.active ? 'bg-primary-500 shadow-[0_4px_14px_0_rgba(115,103,240,0.39)]' : 'bg-primary-100 dark:bg-primary-900/30'} transition-all hover:opacity-80`} style={{height: `${bar.h}%`}}></div>
                  </div>
                  <span className="text-[13px] text-slate-400 font-medium">{t(bar.m)}</span>
                </div>
             ))}
          </div>
        </Card>

        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[18px] font-semibold text-slate-700 dark:text-slate-200 mb-1">{t('Sales Demographics')}</h3>
              <p className="text-[14px] text-slate-500">{t('Ticket Count VS Volume')}</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-5 h-5"/></button>
          </div>
          {/* Radar Chart svg mock */}
           <div className="flex-1 flex items-center justify-center py-4 relative">
              <svg width="220" height="220" viewBox="0 0 200 200" className="opacity-80">
                 {/* Background Webs */}
                 <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                 <polygon points="100,50 145,75 145,125 100,150 55,125 55,75" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
                 
                 {/* Data Polygon 1 */}
                 <polygon points="100,30 150,80 140,140 100,160 50,130 60,60" fill="#7367f0" fillOpacity="0.8" stroke="#7367f0" strokeWidth="2"/>
                 {/* Data Polygon 2 */}
                 <polygon points="100,50 160,70 160,120 100,170 40,120 70,70" fill="#00cfe8" fillOpacity="0.8" stroke="#00cfe8" strokeWidth="2"/>
              </svg>
              {/* Radar Labels */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[13px] text-slate-400 font-medium">{t('Jan')}</span>
              <span className="absolute top-1/4 right-0 mt-2 text-[13px] text-slate-400 font-medium">{t('Feb')}</span>
              <span className="absolute bottom-1/4 right-0 mb-4 text-[13px] text-slate-400 font-medium">{t('Mar')}</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[13px] text-slate-400 font-medium">{t('Apr')}</span>
              <span className="absolute bottom-1/4 left-0 mb-4 text-[13px] text-slate-400 font-medium">{t('May')}</span>
              <span className="absolute top-1/4 left-0 mt-2 text-[13px] text-slate-400 font-medium">{t('Jun')}</span>
           </div>
           <div className="flex justify-center gap-6 mt-6 pb-2">
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50"></div><span className="text-[13px] text-slate-500 font-medium">{t('Sales')}</span></div>
             <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#00cfe8] shadow-sm shadow-cyan-500/50"></div><span className="text-[13px] text-slate-500 font-medium">{t('Visits')}</span></div>
           </div>
        </Card>
      </div>
    </div>
  );
}
