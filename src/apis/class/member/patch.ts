import { req } from "@/apis/axiosInstance";
import type { globalResponse, memberAcceptResponse } from "@/models";

export const memberPATCH = {
  memberAccept: async (class_id: number): Promise<globalResponse<memberAcceptResponse>> => {
    const response = await req.patch(`/classes/${class_id}/accept`);
    return response.data;
  },
};