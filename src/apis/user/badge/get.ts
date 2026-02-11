import { req } from "@/apis/axiosInstance";
import type { badgeResponse, globalResponse } from "@/models";

export const badgeGET = {
  badgeListSearch: async (): Promise<globalResponse<badgeResponse>> => {
    const response = await req.get(`/badges`);
    return response.data;
  },
};

// Backward compatibility for existing imports
export const bageGET = badgeGET;
