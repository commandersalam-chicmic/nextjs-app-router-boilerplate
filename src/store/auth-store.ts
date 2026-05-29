import { create } from "zustand";

import { logger } from "@/lib/default-logger";
import { authService, userService, type LoginPayload, type User } from "@/services";

interface AuthState {
  user: User | null;
  /** Session / auth work in progress (e.g. `fetchUser`, `login`). */
  loading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),

  fetchUser: async () => {
    const hadUserBefore = get().user !== null;
    if (!hadUserBefore) {
      set({ loading: true, error: null });
    }
    try {
      const res = await userService.getMe();
      set((state) => ({
        user: res.data,
        loading: hadUserBefore ? state.loading : false,
      }));
    } catch (err) {
      logger.error("Failed to fetch user", err);
      set({
        user: null,
        loading: false,
      });
    }
  },

  login: async (payload: LoginPayload) => {
    set({ loading: true, error: null });
    try {
      const res = await authService.login(payload);
      const user = res?.data?.user;
      if (user) {
        set({
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          loading: false,
          error: null,
        });
      } else {
        set({ loading: false });
      }
    } catch (err) {
      logger.error("Login failed", err);
      set({ user: null, loading: false });
    }
  },

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null, error: null, loading: false }),

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore network errors
    } finally {
      set({ user: null, loading: false, error: null });
    }
  },
}));
