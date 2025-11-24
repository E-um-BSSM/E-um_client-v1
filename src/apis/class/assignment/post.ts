import { req } from "@/apis/axiosInstance";
import type {
  assignmentRequest,
  assignmentResponse,
  globalResponse,
} from "@/models/index";

export const assignmentPOST = {
  assignmentCreate: async (class_id: number, body: assignmentRequest): Promise<globalResponse<assignmentResponse>> => {
    const response = await req.post(`/classes/${class_id}/assignments`, body);
    return response.data;
  },
};