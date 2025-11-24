import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const assignmentDELETE = {
  assignmentDelete: async (assignment_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/assignments/${assignment_id}`);
    return response.data;
  },
};
