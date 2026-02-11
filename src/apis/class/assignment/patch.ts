import { req } from "@/apis/axiosInstance";
import type { assignmentRequest, assignmentResponse, globalResponse } from "@/models";

export const assignmentPATCH = {
  assignmentUpdate: async (
    class_id: number,
    assignment_id: number,
    body: assignmentRequest,
  ): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.patch(`/classes/${class_id}/assignments/${assignment_id}`, body);
    return response.data;
  },
};
