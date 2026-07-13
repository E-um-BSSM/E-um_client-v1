import { req } from "@/apis/axiosInstance";
import type { noticeCreateRequest, noticeResponse } from "@/models";

export const noticePOST = {
  createNotice: async (classId: number, body: noticeCreateRequest): Promise<noticeResponse> => {
    const response = await req.post(`/classes/${classId}/notices`, body);
    return response.data;
  },
};
