import { req } from "@/apis/axiosInstance";
import type { inviteCodeResponse } from "@/models";

export const invitePOST = {
  createInviteCode: async (classId: number): Promise<inviteCodeResponse> => {
    const response = await req.post(`/classes/${classId}/invite`);
    return response.data;
  },
};
