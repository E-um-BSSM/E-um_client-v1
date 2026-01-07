import { req } from "@/apis/axiosInstance";
import type { postResponse, postListResponse, globalResponse } from "@/models";

export const postGET = {
  postListSearch: async (): Promise<globalResponse<postListResponse>> => {
    const response = await req.get(`/posts`);
    return response.data;
  },

  postSearch: async (post_id: number): Promise<globalResponse<postResponse>> => {
    const response = await req.get(`/posts/${post_id}`);
    return response.data;
  },
};
