import { logger } from "@/lib/default-logger";
import { handleServerError } from "@/lib/errors";
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
      const { errors, message } = handleServerError(err, true, true);
      logger.error("Failed to fetch user", err);
      throw errors ?? message;
    }
  },

  async getById(id: string): Promise<{ data: User }> {
    try {
      return await axiosInstance.get<User>(`${API_ENDPOINTS.USER}/${id}`);
    } catch (err) {
      const { errors, message } = handleServerError(err);
      logger.error("Failed to fetch user", err);
      throw errors ?? message;
    }
  },
};
