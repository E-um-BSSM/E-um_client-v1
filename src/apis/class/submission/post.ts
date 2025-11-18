import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionRequest } from "@/models";

export const submissionPOST = {
  submissionSubmit: async (body: submissionRequest): Promise<globalResponse<{ submission_id: number }>> => {
    const response = await req.post(`/classes/submissions`, body);
    return response.data;
  },
};
