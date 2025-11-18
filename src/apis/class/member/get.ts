import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const memberGET = {
  waitingListSearch: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/waiting`);
    return response.data;
  },
  memberKick: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/members`);
    return response.data;
  },
};