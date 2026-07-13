import { req } from "@/apis/axiosInstance";
import type { noticeResponse, noticeUpdateRequest } from "@/models";

export const noticePATCH = {
  updateNotice: async (classId: number, noticeId: number, body: noticeUpdateRequest): Promise<noticeResponse> => {
    const response = await req.patch(`/classes/${classId}/notices/${noticeId}`, body);
    return response.data;
  },
};
