import { req } from "@/apis/axiosInstance";
import type { classRequest, classResponse, classSearchRequest, globalResponse } from "@/models";

export const classPOST = {
  classCreate: async (body: classRequest): Promise<globalResponse<classResponse>> => {
    const response = await req.post("/classes", body);
    return response.data;
  },

  classListSearch: async (
    params?: classSearchRequest,
  ): Promise<globalResponse<{ content?: classResponse[]; classes?: classResponse[] }>> => {
    const response = await req.get("/classes", { params });
    return response.data;
  },
};
