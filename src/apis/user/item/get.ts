import { req } from "@/apis/axiosInstance";
import type { globalResponse, itemSearchResponse } from "@/models";

export const itemGET = {
  myItemSearch: async (): Promise<globalResponse<itemSearchResponse>> => {
    const response = await req.get(`/items`);
    return response.data;
  },
};
