import { req } from "@/apis/axiosInstance";
import type { applicationFormResponse } from "@/models";

export const applicationGET = {
  getApplicationForm: async (classId: number): Promise<applicationFormResponse> => {
    const response = await req.get(`/classes/${classId}/application-form`);
    return response.data;
  },
};
