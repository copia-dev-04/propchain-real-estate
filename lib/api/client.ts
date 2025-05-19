import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://api.propchain.ae'
    : 'http://localhost:3001');

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Request interceptor: attach Firebase ID token ──────────────────────────
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (typeof window === 'undefined') return config;
    try {
      // Dynamically import Firebase auth to avoid SSR issues
      const { auth } = await import('@/lib/firebase');
      const currentUser = auth.currentUser;
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${idToken}`;
      }
    } catch {
      // Token fetch failed — proceed unauthenticated
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: normalise errors + auto-refresh token ───────────
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== 'undefined') {
      try {
        const { auth } = await import('@/lib/firebase');
        const currentUser = auth.currentUser;
        if (currentUser) {
          // Force-refresh token once
          const freshToken = await currentUser.getIdToken(true);
          const originalConfig = error.config!;
          originalConfig.headers.Authorization = `Bearer ${freshToken}`;
          return api(originalConfig);
        }
      } catch {
        const { auth } = await import('@/lib/firebase');
        await auth.signOut();
        window.location.href = '/signin';
      }
    }

    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'An unexpected error occurred';

    return Promise.reject(new Error(message));
  },
);

export default api;
