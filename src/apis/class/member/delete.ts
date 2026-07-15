import { req } from "@/apis/axiosInstance";

export const memberDELETE = {
  removeMember: async (classId: number, userId: number): Promise<void> => {
    await req.delete(`/classes/${classId}/members/${userId}`);
  },
};
