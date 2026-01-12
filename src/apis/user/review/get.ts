import { req } from "@/apis/axiosInstance";
import type { globalResponse, reviewSearchResponse } from "@/models";

export const reviewGET = {
  reviewSearch: async (): Promise<globalResponse<reviewSearchResponse>> => {
    const response = await req.get(`/reviews`);
    return response.data;
  },
};
