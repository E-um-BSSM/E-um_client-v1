import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const badgePOST = {
  badgeRegister: async (badgeId: string): Promise<globalResponse<Record<string, never>>> => {
    const response = await req.post(`/users/badges/${badgeId}`);
    return response.data;
  },
  badgeEquip: async (badgeId: string): Promise<globalResponse<Record<string, never>>> => {
    const response = await req.post(`/users/badges/${badgeId}/equip`);
    return response.data;
  },
  badgeRelease: async (badgeId: string): Promise<globalResponse<Record<string, never>>> => {
    const response = await req.post(`/users/badges/${badgeId}/release`);
    return response.data;
  },
};
