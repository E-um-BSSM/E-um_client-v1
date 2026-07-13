import { req } from "@/apis/axiosInstance";
import type { availabilityResponse } from "@/models";

export const authGET = {
  checkUsername: async (username: string): Promise<availabilityResponse> => {
    const response = await req.get(`/auth/check-username`, { params: { username } });
    return response.data;
  },
  checkEmail: async (email: string): Promise<availabilityResponse> => {
    const response = await req.get(`/auth/check-email`, { params: { email } });
    return response.data;
  },
};
