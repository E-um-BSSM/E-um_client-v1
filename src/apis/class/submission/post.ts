import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionIdResponse, submissionRequest } from "@/models";

export const submissionPOST = {
  submissionSubmit: async (
    class_id: number,
    assignment_id: number,
    body: submissionRequest,
  ): Promise<globalResponse<submissionIdResponse>> => {
    const response = await req.post(`/classes/${class_id}/assignments/${assignment_id}/submissions`, body);
    return response.data;
  },
};
