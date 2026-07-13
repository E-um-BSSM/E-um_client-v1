import { req } from "@/apis/axiosInstance";
import type { assignmentCreateRequest, assignmentResponse } from "@/models";

export const assignmentPOST = {
  createAssignment: async (classId: number, body: assignmentCreateRequest): Promise<assignmentResponse> => {
    const response = await req.post(`/classes/${classId}/assignments`, body);
    return response.data;
  },
};
