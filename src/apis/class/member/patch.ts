import { req } from "@/apis/axiosInstance";
import type { memberResponse } from "@/models";

export const memberPATCH = {
  acceptMember: async (classId: number, userId: string): Promise<memberResponse> => {
    const response = await req.patch(`/classes/${classId}/members/${userId}/accept`);
    return response.data;
  },
};
