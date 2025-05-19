import api from './client';

export const API = {
  auth: {
    register: (data: Record<string, unknown>) => api.post('/auth/register', data).then(res => res.data),
    login: (data: Record<string, unknown>) => api.post('/auth/login', data).then(res => res.data),
    getMe: () => api.get('/auth/me').then(res => res.data),
  },
  users: {
    getMe: () => api.get('/users/me').then(res => res.data),
    updateMe: (data: Record<string, unknown>) => api.patch('/users/me', data).then(res => res.data),
  },
  properties: {
    getAll: (params?: Record<string, unknown>) => api.get('/properties', { params }).then(res => res.data),
    getById: (id: string) => api.get(`/properties/${id}`).then(res => res.data),
  },
  investments: {
    purchase: (data: { propertyId: string; tokenAmount: number; paymentMethod: string }) => 
      api.post('/investments/purchase', data).then(res => res.data),
    getByUser: (userId: string) => api.get(`/investments/user/${userId}`).then(res => res.data),
  },
  portfolio: {
    getSummary: () => api.get('/portfolio/summary').then(res => res.data),
    getHoldings: () => api.get('/portfolio/holdings').then(res => res.data),
    getTransactions: (params?: Record<string, unknown>) => api.get('/portfolio/transactions', { params }).then(res => res.data),
  }
};
