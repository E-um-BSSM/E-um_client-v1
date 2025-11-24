import { req } from "@/apis/axiosInstance";
import type { globalResponse, waitingListResponse } from "@/models";

export const memberGET = {
  waitingListSearch: async (class_id: number): Promise<globalResponse<waitingListResponse>> => {
    const response = await req.get(`/classes/${class_id}/waiting`);
    return response.data;
  },
};
