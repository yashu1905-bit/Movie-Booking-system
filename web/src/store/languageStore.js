import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Hardcoded dictionary for core application labels
const translations = {
  en: {
    'Search': 'Search (Ctrl+/)',
    'Notifications': 'Notifications',
    'New': 'New',
    'View all notifications': 'View all notifications',
    'Caught up': "You're all caught up!",
    'Generate Demo': 'Generate Demo Alerts',
    'My Profile': 'My Profile',
    'Settings': 'Settings',
    'Sign Out': 'Sign Out',
    'Sign out': 'Sign out',
    'Administrator': 'Administrator',
    'Language': 'Language',
    // Sidebar
    'DASHBOARD': 'DASHBOARD',
    'Analytics': 'Analytics',
    'APPS & PAGES': 'APPS & PAGES',
    'Movies': 'Movies',
    'Theaters': 'Theaters',
    'Shows': 'Shows',
    'Bookings': 'Bookings',
    'Users': 'Users',
    // Dashboard Stats
    'Total Users': 'Total Users', 'Registered Accounts': 'Registered Accounts', '+ Active': '+ Active',
    'Total Movies': 'Total Movies', 'In Database': 'In Database', 'Titles': 'Titles',
    'Total Theaters': 'Total Theaters', 'Active Locations': 'Active Locations', 'Operational': 'Operational',
    'Total Shows': 'Total Shows', 'Scheduled': 'Scheduled', 'Global': 'Global',
    'Total Bookings': 'Total Bookings', 'Lifetime Reservations': 'Lifetime Reservations', 'Confirmed': 'Confirmed',
    'Earning Reports': 'Earning Reports', 'Yearly Earnings Overview': 'Yearly Earnings Overview', 
    'Earnings': 'Earnings', 'Sales': 'Sales',
    'Sales Demographics': 'Sales Demographics', 'Ticket Count VS Volume': 'Ticket Count VS Volume',
    'Jan': 'Jan','Feb': 'Feb','Mar': 'Mar','Apr': 'Apr','May': 'May','Jun': 'Jun','Jul': 'Jul',
    'Visits': 'Visits'
  },
  hi: {
    'Search': 'खोजें (Ctrl+/)',
    'Notifications': 'सूचनाएं',
    'New': 'नया',
    'View all notifications': 'सभी सूचनाएं देखें',
    'Caught up': "आप पूरी तरह अपडेट हैं!",
    'Generate Demo': 'डेमो अलर्ट जेनरेट करें',
    'My Profile': 'मेरी प्रोफ़ाइल',
    'Settings': 'सेटिंग्स',
    'Sign Out': 'लॉग आउट',
    'Sign out': 'लॉग आउट',
    'Administrator': 'प्रशासक',
    'Language': 'भाषा',
    // Sidebar
    'DASHBOARD': 'डैशबोर्ड',
    'Analytics': 'एनालिटिक्स',
    'APPS & PAGES': 'ऐप्स और पृष्ठ',
    'Movies': 'फ़िल्में',
    'Theaters': 'थिएटर',
    'Shows': 'शो',
    'Bookings': 'बुकिंग',
    'Users': 'उपयोगकर्ता',
    // Dashboard Stats
    'Total Users': 'कुल उपयोगकर्त्त', 'Registered Accounts': 'पंजीकृत खाते', '+ Active': '+ सक्रिय',
    'Total Movies': 'कुल फ़िल्में', 'In Database': 'डेटाबेस में', 'Titles': 'शीर्षक',
    'Total Theaters': 'कुल थिएटर', 'Active Locations': 'सक्रिय स्थान', 'Operational': 'संचालन में',
    'Total Shows': 'कुल शो', 'Scheduled': 'निर्धारित', 'Global': 'वैश्विक',
    'Total Bookings': 'कुल बुकिंग', 'Lifetime Reservations': 'आजीवन आरक्षण', 'Confirmed': 'पुष्टि की गई',
    'Earning Reports': 'कमाई की रिपोर्ट', 'Yearly Earnings Overview': 'वार्षिक कमाई अवलोकन', 
    'Earnings': 'कमाई', 'Sales': 'बिक्री',
    'Sales Demographics': 'बिक्री जनसांख्यिकी', 'Ticket Count VS Volume': 'टिकट संख्या बनाम वॉल्यूम',
    'Jan': 'जनवरी','Feb': 'फ़रवरी','Mar': 'मार्च','Apr': 'अप्रैल','May': 'मई','Jun': 'जून','Jul': 'जुलाई',
    'Visits': 'विजिट्स'
  }
};

export const useLanguageStore = create(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      setLanguage: (lang) => set({ currentLanguage: lang }),
      t: (key) => {
        const lang = get().currentLanguage;
        return translations[lang]?.[key] || translations['en'][key] || key;
      }
    }),
    {
      name: 'app-language', // persist in localStorage
    }
  )
);

export const availableLanguages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' }
];
