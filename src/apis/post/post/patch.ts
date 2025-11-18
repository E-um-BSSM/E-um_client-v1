import { req } from "@/apis/axiosInstance";
<<<<<<< HEAD
import type { postRequest, postResponse, globalResponse } from "@/models";

export const postPATCH = {
  postUpdate: async (post_id: number, body: postRequest): Promise<globalResponse<postResponse>> => {
    const response = await req.patch(`/posts/${post_id}`, body);
    return response.data;
  },
};
=======
import type { postResponse, globalResponse } from "@/models";

export const postPATCH = {
  postUpdate: async (post_id: number): Promise<globalResponse<postResponse>> => {
    const response = await req.patch(`/posts/${post_id}`);;
    return response.data;
  },
};
>>>>>>> 2892ef1 (feat: post api 함수 추가)
