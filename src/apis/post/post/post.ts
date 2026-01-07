import { req } from "@/apis/axiosInstance";
import type { postRequest, postResponse, globalResponse } from "@/models";

export const postPOST = {
  postCreate: async (body: postRequest): Promise<globalResponse<postResponse>> => {
    const response = await req.post(`/posts`, body);
    return response.data;
  },
};
