import { req } from "../../axiosInstance";
import type { globalResponse } from "../../../models/index";

export const joinApi = {
  classJoinApplication: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.post(`/classes/${class_id}/join`);
    return response.data;
  },
  classJoinCancel: async (class_id: number): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/join`);
    return {
      success: true,
      data: {},
    };
  },
};
