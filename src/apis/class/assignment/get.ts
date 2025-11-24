import { req } from "@/apis/axiosInstance";
import type { assignmentSearchResponse, globalResponse } from "@/models";

export const assignmentGET = {
  assignmentSearch: async (class_id: number): Promise<globalResponse<{ assignments: assignmentSearchResponse[] }>> => {
    const response = await req.get(`/classes/${class_id}/assignments`);
    return response.data;
  },
};
