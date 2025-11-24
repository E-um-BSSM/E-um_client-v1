import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const memberDELETE = {
  memberDisagree: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/disagree`);
    return response.data;
  },
  memberKick: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/members`);
    return response.data;
  },
};
