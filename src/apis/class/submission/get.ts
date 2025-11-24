import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionResponse } from "@/models";

export const submissionGET = {
  submissionSearch: async (assignment_id: number): Promise<globalResponse<submissionResponse>> => {
    const response = await req.get(`/classes/assignments/${assignment_id}/submissions/`);
    return response.data;
  },
};
