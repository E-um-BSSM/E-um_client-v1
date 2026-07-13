import { req } from "@/apis/axiosInstance";

export const joinDELETE = {
  cancelApplication: async (classId: number): Promise<void> => {
    await req.delete(`/classes/${classId}/join`);
  },
};
