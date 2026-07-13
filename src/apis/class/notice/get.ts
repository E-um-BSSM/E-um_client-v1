import { req } from "@/apis/axiosInstance";
import type { noticePageResponse, noticeResponse, pageRequest } from "@/models";

export const noticeGET = {
  getNotices: async (classId: number, params?: pageRequest): Promise<noticePageResponse> => {
    const response = await req.get(`/classes/${classId}/notices`, { params });
    return response.data;
  },
  getNotice: async (classId: number, noticeId: number): Promise<noticeResponse> => {
    const response = await req.get(`/classes/${classId}/notices/${noticeId}`);
    return response.data;
  },
};
