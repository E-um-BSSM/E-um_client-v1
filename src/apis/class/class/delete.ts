import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const classDELETE = {
  classDelete: async (class_id: number): Promise<globalResponse<object>> => {
    const response = await req.delete(`/classes/${class_id}`);
    return response.data;
  },
};
