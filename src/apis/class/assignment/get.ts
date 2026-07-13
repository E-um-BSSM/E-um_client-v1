import { req } from "@/apis/axiosInstance";
import type { assignmentPageResponse, assignmentResponse, pageRequest } from "@/models";

export const assignmentGET = {
  getAssignments: async (classId: number, params?: pageRequest): Promise<assignmentPageResponse> => {
    const response = await req.get(`/classes/${classId}/assignments`, { params });
    return response.data;
  },
  getAssignment: async (classId: number, assignmentId: number): Promise<assignmentResponse> => {
    const response = await req.get(`/classes/${classId}/assignments/${assignmentId}`);
    return response.data;
  },
};
