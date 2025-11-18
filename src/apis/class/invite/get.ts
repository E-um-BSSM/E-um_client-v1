import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const inviteGET = {
  classInviteCodeGet: async (class_id: number): Promise<globalResponse<{ class_code: number }>> => {
    const response = await req.get(`/classes/${class_id}/invite`);
    return response.data;
  },
};
