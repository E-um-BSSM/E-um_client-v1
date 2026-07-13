import { req } from "@/apis/axiosInstance";
import type { classCreateRequest, classResponse } from "@/models";

export const classPOST = {
  createClass: async (body: classCreateRequest): Promise<classResponse> => {
    const response = await req.post(`/classes`, body);
    return response.data;
  },
};
