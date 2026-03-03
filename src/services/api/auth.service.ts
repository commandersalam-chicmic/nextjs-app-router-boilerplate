import { handleServerError } from "@/lib/errors";
import { toast } from "@/lib/toast";
import { API_ENDPOINTS } from "@/services/urls";
import { axiosInstance } from "../axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: { id: string; email: string; name: string };
}

export const authService = {
  async login(data: LoginPayload): Promise<{ data: LoginResponse }> {
    try {
      const res = await axiosInstance.post<LoginResponse>(API_ENDPOINTS.AUTH_LOGIN, data);
      toast.success("Signed in successfully");
      return res;
    } catch (err) {
      const { message } = handleServerError(err, true);
      if (message) toast.error(message);
      throw err;
    }
  },

  async logout(): Promise<void> {
    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH_LOGOUT);
      toast.success("Signed out");
    } catch (err) {
      const { message } = handleServerError(err, true);
      if (message) toast.error(message);
      throw err;
    }
  },
};
