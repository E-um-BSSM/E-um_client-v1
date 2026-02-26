import { req } from "@/apis/axiosInstance";
import type { ApiResponse, classRequest, classResponse, classSearchRequest, ClassroomListPayload, globalResponse } from "@/models";

export const classPOST = {
  classCreate: async (body: classRequest): Promise<globalResponse<classResponse>> => {
    const response = await req.post("/classes", body);
    return response.data;
  },

  classListSearch: async (params?: classSearchRequest): Promise<ApiResponse<ClassroomListPayload>> => {
    const response = await req.get("/classes/search", { params });
    return response.data;
  },
};
