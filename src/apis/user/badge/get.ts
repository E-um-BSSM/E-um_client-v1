import { req } from "@/apis/axiosInstance";
import type { badgeResponse, globalResponse } from "@/models";

export const bageGET = {
  badgeListSearch: async (): Promise<globalResponse<badgeResponse>> => {
    const response = await req.get(`/badges`);
    return response.data;
  },
};
