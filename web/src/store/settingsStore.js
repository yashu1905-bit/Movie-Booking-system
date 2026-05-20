import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      platformName: 'Vuexy Movie Booking',
      logoUrl: '', // empty means use default SVG
      supportEmail: 'support@moviebooking.com',
      contactPhone: '+1 (555) 123-4567',
      stripeEnabled: true,
      razorpayEnabled: false,
      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'app-settings', // saved to localStorage
    }
  )
);
