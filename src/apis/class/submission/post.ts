import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionIdResponse, submissionRequest } from "@/models";

export const submissionPOST = {
  submissionSubmit: async (body: submissionRequest): Promise<globalResponse<submissionIdResponse>> => {
    const response = await req.post(`/classes/submissions`, body);
    return response.data;
  },
};
