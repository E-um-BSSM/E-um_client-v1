import { req } from "@/apis/axiosInstance";
import type { globalResponse, profileResponse } from "@/models";

export const profileGET = {
  profileSearch: async (username: string): Promise<globalResponse<profileResponse>> => {
    const response = await req.get(`/profiles/${username}`);
    return response.data;
  },
  profileListSearch: async (username: string): Promise<globalResponse<{ content: profileResponse[] }>> => {
    const response = await req.get(`/profiles/${username}/list`);
    return response.data;
  },
};
