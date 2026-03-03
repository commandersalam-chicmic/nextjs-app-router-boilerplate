import { handleServerError } from "@/lib/errors";
import { toast } from "@/lib/toast";
import { API_ENDPOINTS } from "@/services/urls";
import { axiosInstance } from "../axios";

export const healthService = {
  async check(): Promise<{ data: { status: string } }> {
    try {
      return await axiosInstance.get<{ status: string }>(API_ENDPOINTS.HEALTH);
    } catch (err) {
      const { message } = handleServerError(err, true);
      if (message) toast.error(message);
      throw err;
    }
  },
};
