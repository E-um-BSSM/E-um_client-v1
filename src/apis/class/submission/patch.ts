import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionFeedbackRequest } from "@/models";

export const submissionPATCH = {
  submissionFeedback: async (
    class_id: number,
    assignment_id: number,
    submission_id: number,
    body: submissionFeedbackRequest,
  ): Promise<globalResponse<object>> => {
    const response = await req.patch(
      `/classes/${class_id}/assignments/${assignment_id}/submissions/${submission_id}`,
      body,
    );
    return response.data;
  },
};
