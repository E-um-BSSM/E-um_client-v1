import { req } from "@/apis/axiosInstance";
import type { assignmentRequest, assignmentResponse, globalResponse } from "@/models";

export const assignmentPATCH = {
  assignmentUpdate: async (
    assignment_id: number,
    body: assignmentRequest,
  ): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.patch(`/classes/assignments/${assignment_id}`, body);
    return response.data;
  },
};
