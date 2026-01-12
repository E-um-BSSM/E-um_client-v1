import { req } from "@/apis/axiosInstance";
import type { globalResponse, reviewRequest, reviewResponse } from "@/models";

export const reviewPOST = {
  reviewCreate: async (body: reviewRequest): Promise<globalResponse<reviewResponse>> => {
    const response = await req.post(`/reviews`, body);
    return response.data;
  },
};
