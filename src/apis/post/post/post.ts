import { req } from "@/apis/axiosInstance";
<<<<<<< HEAD
import type { postRequest, postResponse, globalResponse } from "@/models";

export const postPOST = {
  postCreate: async (body: postRequest): Promise<globalResponse<postResponse>> => {
    const response = await req.post(`/posts`, body);
    return response.data;
  },
};
=======
import type { postResponse, globalResponse } from "@/models";

export const postPOST = {
  postCreate: async (): Promise<globalResponse<postResponse>> => {
    const response = await req.post(`/posts`);
    return response.data;
  },
};
>>>>>>> 2892ef1 (feat: post api 함수 추가)
