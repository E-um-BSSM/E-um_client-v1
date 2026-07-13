import { req } from "@/apis/axiosInstance";

export const noticeDELETE = {
  deleteNotice: async (classId: number, noticeId: number): Promise<void> => {
    await req.delete(`/classes/${classId}/notices/${noticeId}`);
  },
};
