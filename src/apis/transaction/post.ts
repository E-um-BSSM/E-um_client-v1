import { req } from "@/apis/axiosInstance";
import type { globalResponse } from "@/models";

export const transactionPOST = {
  dailyCompensation: async (): Promise<globalResponse<{currency: number}>> => {
    const response = await req.post(`/transaction/daily`);
    return response.data;
  },

  giveCurrency: async (): Promise<globalResponse<object>> => {
    const response = await req.post(`/transactions/transfer`);
    return response.data;
  },
};