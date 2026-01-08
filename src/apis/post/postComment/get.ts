import { req } from "@/apis/axiosInstance";
import type { postCommentResponse, globalResponse } from "@/models";

export const postCommentGET = {
  commentSearch: async (post_id: number): Promise<globalResponse<postCommentResponse>> => {
    const response = await req.get(`/posts/${post_id}/comments`);
    return response.data;
  },
};
