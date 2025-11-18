import { req } from "@/apis/axiosInstance";
import type { postResponse, globalResponse } from "@/models";

export const postPOST = {
  postCreate: async (): Promise<globalResponse<postResponse>> => {
    const response = await req.post(`/posts`);
    return response.data;
  },
};