import { req } from "@/apis/axiosInstance";
import type { pushReadRequest, globalResponse } from "@/models";

export const pushPOST = {
  submitPost: async (body: pushReadRequest): Promise<globalResponse<object>> => {
    const response = await req.post(`/push`, body);
    return response.data;
  },
};
