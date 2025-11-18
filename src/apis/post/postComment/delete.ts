import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const postCommentDELETE = {
  commentDelete: async (comments_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/posts/comments/${comments_id}`);
    return response.data;
  },
};