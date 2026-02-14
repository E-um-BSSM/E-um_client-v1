import { req } from "@/apis/axiosInstance";
import type { classResponse, globalResponse } from "@/models";

export const classGET = {
  classSingleSearch: async (class_id: number): Promise<globalResponse<classResponse>> => {
    const response = await req.get(`/classes/${class_id}`);
    return response.data;
  },
};
