import { req } from "@/apis/axiosInstance";
import type { assignmentResponse, assignmentUpdateRequest } from "@/models";

export const assignmentPATCH = {
  updateAssignment: async (
    classId: number,
    assignmentId: number,
    body: assignmentUpdateRequest,
  ): Promise<assignmentResponse> => {
    const response = await req.patch(`/classes/${classId}/assignments/${assignmentId}`, body);
    return response.data;
  },
};
