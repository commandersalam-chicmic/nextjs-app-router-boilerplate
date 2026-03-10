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
    return await axiosInstance.get<User>(API_ENDPOINTS.USER_ME);
  },

  async getById(id: string): Promise<{ data: User }> {
    return await axiosInstance.get<User>(`${API_ENDPOINTS.USER}/${id}`);
  },
};
