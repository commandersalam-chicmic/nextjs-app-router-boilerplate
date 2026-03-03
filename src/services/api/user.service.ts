import { handleServerError } from "@/lib/errors";
import { toast } from "@/lib/toast";
import { API_ENDPOINTS } from "@/services/urls";
import { axiosInstance } from "../axios";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export const userService = {
  async getMe(): Promise<{ data: User }> {
    try {
      return await axiosInstance.get<User>(API_ENDPOINTS.USER_ME);
    } catch (err) {
      const { message } = handleServerError(err, true);
      if (message) toast.error(message);
      throw err;
    }
  },

  async getById(id: string): Promise<{ data: User }> {
    try {
      return await axiosInstance.get<User>(`${API_ENDPOINTS.USER}/${id}`);
    } catch (err) {
      const { message } = handleServerError(err, true);
      if (message) toast.error(message);
      throw err;
    }
  },
};
