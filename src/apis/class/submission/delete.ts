import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const submissionDELETE = {
  submissionSubmitCancel: async (
    class_id: number,
    assignment_id: number,
    submission_id: number,
  ): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`);
    return response.data;
  },
};
