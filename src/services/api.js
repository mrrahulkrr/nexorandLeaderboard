// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/v1/login', credentials),
  register: (userData) => api.post('/auth/v1/register', userData),
  getUserInfo: () => api.get('/auth/v1/get-users-info-id'),
};

export const leaderboardAPI = {
  getUsers: () => api.get('/user/v1/get-users'),
  getUserHistory: (username) => api.post('/user/v1/your-history', { username }),
  claimPoints: (username) => api.patch('/user/v1/claim-points', { username }),
  getTodayHistory: () => api.get('/user/v1/your-daily-history'),
  getWeeklyData: () => api.get('/user/v1/your-weekly-history'),
  getMonthlyData: () => api.get('/user/v1/your-monthly-history'),
};

export default api;