import { req } from "@/apis/axiosInstance";
import type { memberResponse } from "@/models";

export const memberPATCH = {
  acceptMember: async (classId: number, userId: number): Promise<memberResponse> => {
    const response = await req.patch(`/classes/${classId}/members/${userId}/accept`);
    return response.data;
  },
};
