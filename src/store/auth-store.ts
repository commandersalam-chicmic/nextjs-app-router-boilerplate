import { handleServerError } from "@/lib/errors";
import {
  authService,
  userService,
  type LoginPayload,
  type User,
} from "@/services";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await userService.getMe();
      set({ user: res.data, isLoading: false });
    } catch (err) {
      const { message } = handleServerError(err, true, true);
      set({ user: null, error: message ?? null, isLoading: false });
    }
  },

  login: async (payload: LoginPayload) => {
    set({ isLoading: true, error: null });
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
          isLoading: false,
          error: null,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      const { message } = handleServerError(err, true, true);
      set({ user: null, error: message ?? null, isLoading: false });
      throw err;
    }
  },

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null, error: null }),
}));
