import { req } from "@/apis/axiosInstance";
import type { globalResponse, signInResponse } from "@/models";

interface bsmLoginResponse {
  redirect_url: string;
}

export const authGET = {
  bsmLogin: async (): Promise<globalResponse<bsmLoginResponse>> => {
    const response = await req.get("/auth/bsm/login");
    return response.data;
  },
  bsmCallback: async (query: Record<string, string>): Promise<globalResponse<signInResponse>> => {
    const response = await req.get("/auth/bsm", { params: query });
    return response.data;
  },
};
