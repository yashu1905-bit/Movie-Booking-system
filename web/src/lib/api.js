import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Standard backend port
  timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // The backend uses successResponse which returns { status: 'success', data: ..., message: ... }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || 'API Error: Something went wrong!';
    toast.error(message);
    return Promise.reject(error);
  }
);
