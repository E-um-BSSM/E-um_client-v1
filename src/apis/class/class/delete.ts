import { req } from "@/apis/axiosInstance";

export const classDELETE = {
  deleteClass: async (classId: number): Promise<void> => {
    await req.delete(`/classes/${classId}`);
  },
};
