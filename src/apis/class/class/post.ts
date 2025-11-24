import { req } from "@/apis/axiosInstance";
import type { classRequest, classResponse, classSearchRequest, globalResponse } from "@/models";

export const classPOST = {
  classCreate: async (body: classRequest): Promise<globalResponse<classResponse>> => {
    const response = await req.post("/classes/create", body);
    return response.data;
  },

  classListSearch: async (body: classSearchRequest): Promise<globalResponse<{ classes: classResponse[] }>> => {
    const response = await req.post("/classes/search", body);
    return response.data;
  },
};
