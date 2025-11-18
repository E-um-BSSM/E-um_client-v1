import { req } from "@/apis/axiosInstance";
import type { globalResponse, submissionFeedbackRequest } from "@/models";

export const submissionPATCH = {
  submissionFeedback: async (
    submission_id: number,
    body: submissionFeedbackRequest,
  ): Promise<globalResponse<object>> => {
    const response = await req.patch(`/classes/submissions/${submission_id}`, body);
    return response.data;
  },
};
