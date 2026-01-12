import { req } from "@/apis/axiosInstance";
import type { globalResponse, reviewRequest, reviewResponse } from "@/models";

export const reviewPATCH = {
  reviewUpdate: async (reviewId: number, body: reviewRequest): Promise<globalResponse<reviewResponse>> => {
    const response = await req.patch(`/reviews/${reviewId}`);
    return response.data;
  },
};
