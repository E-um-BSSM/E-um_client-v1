import { req } from "@/apis/axiosInstance";
import type { globalResponse, profileResponse } from "@/models";

export const profileGET = {
  profileSearch: async (username: string): Promise<globalResponse<profileResponse>> => {
    const response = await req.get(`/profiles/${username}`);
    return response.data;
  },
  profileListSearch: async (): Promise<globalResponse<{ content: profileResponse[] }>> => {
    const response = await req.get(`/profiles/list`);
    return response.data;
  },
};
