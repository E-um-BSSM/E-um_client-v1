import { req } from "@/apis/axiosInstance";
import type { submissionCreateRequest, submissionResponse } from "@/models";

export const submissionPOST = {
  submitAssignment: async (
    classId: number,
    assignmentId: number,
    body: submissionCreateRequest,
  ): Promise<submissionResponse> => {
    const response = await req.post(`/classes/${classId}/assignments/${assignmentId}/submissions`, body);
    return response.data;
  },
};
