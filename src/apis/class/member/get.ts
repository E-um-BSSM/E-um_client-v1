import { req } from "@/apis/axiosInstance";
import type { memberPageResponse, pageRequest, waitingMemberPageResponse } from "@/models";

export const memberGET = {
  getMembers: async (classId: number, params?: pageRequest): Promise<memberPageResponse> => {
    const response = await req.get(`/classes/${classId}/members`, { params });
    return response.data;
  },
  getWaitingList: async (classId: number, params?: pageRequest): Promise<waitingMemberPageResponse> => {
    const response = await req.get(`/classes/${classId}/waiting`, { params });
    return response.data;
  },
};
