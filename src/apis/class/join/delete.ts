import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const joinDELETE = {
  classJoinCancel: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}/join`);
    return response.data;
  },
};
