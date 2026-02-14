import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionResponse } from "@/models";

export const submissionGET = {
  submissionSearch: async (
    class_id: number,
    assignment_id: number,
  ): Promise<globalResponse<{ submissions?: submissionResponse[]; content?: submissionResponse[] }>> => {
    const response = await req.get(`/classes/${class_id}/assignments/${assignment_id}/submissions/`);
    return response.data;
  },
};
