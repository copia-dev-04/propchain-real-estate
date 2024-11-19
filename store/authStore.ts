import { create } from 'zustand';
import type { User as FirebaseUser } from 'firebase/auth';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'investor' | 'admin';
  kycStatus: 'pending' | 'verified' | 'rejected';
  walletAddress?: string;
}

interface AuthState {
  firebaseUser: FirebaseUser | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,

  setFirebaseUser: (user) =>
    set({ firebaseUser: user, isAuthenticated: !!user }),

  setProfile: (profile) => set({ profile }),

  setLoading: (loading) => set({ isLoading: loading }),

  logout: () =>
    set({
      firebaseUser: null,
      profile: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
