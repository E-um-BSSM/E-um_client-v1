import { req } from "@/apis/axiosInstance";
import type { pushSearchResponse, globalResponse } from "@/models";

export const pushGET = {
  searchPush: async (): Promise<globalResponse<pushSearchResponse>> => {
    const response = await req.get(`/pust`);
    return response.data;
  },
};
