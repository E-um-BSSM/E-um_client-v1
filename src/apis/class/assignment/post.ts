import { req } from "@/apis/axiosInstance";
import type {
  assignmentRequest,
  assignmentSubmitRequest,
  assignmentResponse,
  assignmentSubmitResponse,
  globalResponse,
} from "@/models/index";

export const assignmentPOST = {
  assignmentCreate: async (class_id: number, body: assignmentRequest): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.post(`/classes/${class_id}/assignments`, body);
    return response.data;
  },

  assignmentSubmit: async (
    class_id: number,
    assignment_id: number,
    body: assignmentSubmitRequest,
  ): Promise<globalResponse<assignmentSubmitResponse>> => {
    const response = await req.post(`/classes/${class_id}/${assignment_id}`, body);
    return response.data;
  },
};