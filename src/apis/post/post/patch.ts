import { req } from "@/apis/axiosInstance";
import type { postResponse, globalResponse } from "@/models";

export const postPATCH = {
  postUpdate: async (post_id: number): Promise<globalResponse<postResponse>> => {
    const response = await req.patch(`/posts/${post_id}`);;
    return response.data;
  },
};