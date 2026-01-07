import { req } from "@/apis/axiosInstance";
import type { postRequest, postResponse, globalResponse } from "@/models";

export const postPATCH = {
  postUpdate: async (post_id: number, body: postRequest): Promise<globalResponse<postResponse>> => {
    const response = await req.patch(`/posts/${post_id}`, body);
    return response.data;
  },
};
