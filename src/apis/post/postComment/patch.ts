import { req } from "@/apis/axiosInstance";
import type {
  postCommentRequest,
  postCommentAdoptRequest,
  postCommentResponse,
  postCommentCreateResponse,
  globalResponse,
} from "@/models";

export const postCommentPATCH = {
  commentUpdate: async (
    comments_id: number,
    body: postCommentRequest,
  ): Promise<globalResponse<postCommentCreateResponse>> => {
    const response = await req.patch(`/posts/comments/${comments_id}`, body);
    return response.data;
  },

  commentAdopt: async (
    comments_id: number,
    body: postCommentAdoptRequest,
  ): Promise<globalResponse<postCommentResponse>> => {
    const response = await req.patch(`/posts/comments/${comments_id}/adopt`, body);
    return response.data;
  },
};
