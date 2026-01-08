import { req } from "@/apis/axiosInstance";
import type { pushReadRequest, pushReadResponse, globalResponse } from "@/models";

export const pushPATCH = {
  readPush: async (push_id: string, body: pushReadRequest): Promise<globalResponse<pushReadResponse>> => {
    const response = await req.patch(`/push/${push_id}`, body);
    return response.data;
  },
};
