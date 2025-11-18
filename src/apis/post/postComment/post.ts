import { req } from "@/apis/axiosInstance";
import type { postCommentRequest, postCommentCreateResponse, globalResponse } from "@/models";

export const postCommentPOST = {
  commentCreate: async (post_id: number, body: postCommentRequest): Promise<globalResponse<postCommentCreateResponse>> => {
    const response = await req.post(`/posts/${post_id}/comments`, body);
    return response.data;
  },
};