
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { medusa } from '@/lib/medusa';

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const { customer } = await medusa.auth.authenticate({
            email,
            password,
          });
          set({ user: customer, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      logout: async () => {
        try {
          await medusa.auth.deleteSession();
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      checkAuth: async () => {
        try {
          const { customer } = await medusa.customers.retrieve();
          set({ user: customer, isAuthenticated: true });
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
