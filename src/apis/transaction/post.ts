import { req } from "@/apis/axiosInstance";
import type { transferRequest, daliyCompensationReponse, globalResponse } from "@/models";

export const transactionPOST = {
  dailyCompensation: async (): Promise<globalResponse<daliyCompensationReponse>> => {
    const response = await req.post(`/transaction/daily`);
    return response.data;
  },

  giveCurrency: async (body: transferRequest): Promise<globalResponse<object>> => {
    const response = await req.post(`/transactions/transfer`, body);
    return response.data;
  },
};
