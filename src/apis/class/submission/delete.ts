import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const submissionDELETE = {
  submissionSubmitCancel: async (submission_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/submissions/${submission_id}`);
    return response.data;
  },
};
