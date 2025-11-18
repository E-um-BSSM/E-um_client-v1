import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const invitePOST = {
  classInviteCodeCreate: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.post(`/classes/${class_id}/invite`);
    return response.data;
  },
};
