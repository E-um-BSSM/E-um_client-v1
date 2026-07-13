import { req } from "@/apis/axiosInstance";
import type { applicationFormResponse, applicationFormUpdateRequest } from "@/models";

export const applicationPUT = {
  putApplicationForm: async (
    classId: number,
    body: applicationFormUpdateRequest,
  ): Promise<applicationFormResponse> => {
    const response = await req.put(`/classes/${classId}/application-form`, body);
    return response.data;
  },
};
