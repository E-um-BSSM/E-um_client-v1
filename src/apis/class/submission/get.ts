import { req } from "@/apis/axiosInstance";
import type { submissionPageResponse, submissionResponse, submissionSearchRequest } from "@/models";

export const submissionGET = {
  getSubmissions: async (
    classId: number,
    assignmentId: number,
    params?: submissionSearchRequest,
  ): Promise<submissionPageResponse> => {
    const response = await req.get(`/classes/${classId}/assignments/${assignmentId}/submissions`, { params });
    return response.data;
  },
  getSubmission: async (
    classId: number,
    assignmentId: number,
    submissionId: number,
  ): Promise<submissionResponse> => {
    const response = await req.get(
      `/classes/${classId}/assignments/${assignmentId}/submissions/${submissionId}`,
    );
    return response.data;
  },
};
