import { req } from "@/apis/axiosInstance";
import type { submissionFeedbackRequest, submissionResponse } from "@/models";

export const submissionPATCH = {
  gradeSubmission: async (
    classId: number,
    assignmentId: number,
    submissionId: number,
    body: submissionFeedbackRequest,
  ): Promise<submissionResponse> => {
    const response = await req.patch(
      `/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}/feedback`,
      body,
    );
    return response.data;
  },
};
