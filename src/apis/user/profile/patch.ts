import { req } from "@/apis/axiosInstance";
import type { globalResponse, profileRequest, profileResponse } from "@/models";

export const profilePATCH = {
  profileUpdate: async (body: profileRequest): Promise<globalResponse<profileResponse>> => {
    const response = await req.patch(`/profiles`, body);
    return response.data;
  },
};
