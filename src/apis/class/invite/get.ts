import { req } from "@/apis/axiosInstance";
import type { inviteCodeResponse } from "@/models";

export const inviteGET = {
  getInviteCode: async (classId: number): Promise<inviteCodeResponse> => {
    const response = await req.get(`/classes/${classId}/invite`);
    return response.data;
  },
};
