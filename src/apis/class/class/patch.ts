import { req } from "@/apis/axiosInstance";
import type { classResponse, classUpdateRequest } from "@/models";

export const classPATCH = {
  updateClass: async (classId: number, body: classUpdateRequest): Promise<classResponse> => {
    const response = await req.patch(`/classes/${classId}`, body);
    return response.data;
  },
};
