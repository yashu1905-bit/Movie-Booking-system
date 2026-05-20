import { api } from '../lib/api';

const createCrudService = (endpoint) => ({
  getAll: () => api.get(endpoint),
  getById: (id) => api.get(`${endpoint}/${id}`),
  create: (data) => api.post(endpoint, data),
  update: ({ id, data }) => api.put(`${endpoint}/${id}`, data),
  delete: (id) => api.delete(`${endpoint}/${id}`)
});

export const authService = {
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
};

export const analyticsService = {
  getStats: () => api.get('/analytics'),
};

export const usersService = createCrudService('/users');
export const moviesService = createCrudService('/movies');
export const theatersService = createCrudService('/theaters');
export const showsService = createCrudService('/shows');
export const bookingsService = createCrudService('/bookings');

export const notificationsService = {
  ...createCrudService('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
  triggerDemo: () => api.post('/notifications/trigger-demo')
};

export const appSettingsService = {
  getSettings: () => api.get('/settings'),
  updateSettings: (data) => api.put('/settings', data)
};
