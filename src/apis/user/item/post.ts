import { req } from "@/apis/axiosInstance";
import type { globalResponse, itemEquipmentRequest, itemSearchResponse, randomBoxResponse } from "@/models";

export const itemPOST = {
  randomBoxOpen: async (boxId: number): Promise<globalResponse<randomBoxResponse>> => {
    const response = await req.post(`/items/randomboxes/${boxId}`);
    return response.data;
  },
  itemEquipment: async (itemId: number, body: itemEquipmentRequest): Promise<globalResponse<itemSearchResponse>> => {
    const response = await req.post(`/items/${itemId}`, body);
    return response.data;
  },
};
