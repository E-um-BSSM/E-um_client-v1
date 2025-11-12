import { req } from "../../axiosInstance";
import type { globalResponse, memberAcceptResponse } from "../../../models/index";

export const memberApi = {
  memberAccept: async (class_id: number): Promise<globalResponse<memberAcceptResponse>> => {
    const response = await req.patch(`/classes/${class_id}/accept`);
    return response.data;
  },
  memberDisagre: async (class_id: number): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/disagre`);
    return {
      success: true,
      data: {},
    };
  },
  memberKick: async (class_id: number): Promise<globalResponse<object>> => {
    await req.delete(`/classes/${class_id}/members`);
    return {
      success: true,
      data: {},
    };
  },
};
