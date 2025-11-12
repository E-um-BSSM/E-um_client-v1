import { req } from "../../axiosInstance";
import type { globalResponse } from "../../../models/index";

export const inviteApi = {
  classInviteCodeCreate: async (class_id: number): Promise<globalResponse<object>> => {
    await req.post(`/classes/${class_id}/invite`);
    return {
      success: true,
      data: {},
    };
  },
  classInviteCoddeGet: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.get(`/classes/${class_id}/invite`);
    return response.data;
  },
};
