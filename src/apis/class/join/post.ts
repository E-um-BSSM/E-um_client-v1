import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const joinPOST = {
  classJoinApplication: async (class_id: number): Promise<globalResponse<{ message: string }>> => {
    const response = await req.post(`/classes/${class_id}/join`);
    return response.data;
  },
};
