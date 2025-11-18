import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const assignmentDELETE = {
  assignmentDelete: async (class_id: number, assignment_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/${assignment_id}`);
    return response.data;
  },

  assignmentSubmitDelete: async (class_id: number, assignment_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/${assignment_id}/submit`);
    return response.data;
  },
};
