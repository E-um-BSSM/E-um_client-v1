import { req } from "@/apis/axiosInstance";
import type { classCodeResponse, globalResponse } from "@/models";

export const inviteGET = {
  classInviteCodeGet: async (class_id: number): Promise<globalResponse<classCodeResponse>> => {
    const response = await req.get(`/classes/${class_id}/invite`);
    return response.data;
  },
};
