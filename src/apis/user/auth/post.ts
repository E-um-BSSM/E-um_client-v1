import { req } from "@/apis/axiosInstance";
import type {
  globalResponse,
  signInRequest,
  signInResponse,
  signOutRequest,
  signOutResponse,
  signUpRequest,
  signUpResponse,
  refreshRequest,
  refreshResponse,
} from "@/models";

export const authPOST = {
  signUp: async (body: signUpRequest): Promise<globalResponse<signUpResponse>> => {
    const response = await req.post(`/auth/signup`, body);
    return response.data;
  },
  signIn: async (body: signInRequest): Promise<globalResponse<signInResponse>> => {
    const response = await req.post(`/auth/signin`, body);
    return response.data;
  },
  signOut: async (body: signOutRequest): Promise<globalResponse<signOutResponse>> => {
    const response = await req.post(`/auth/signout`, body);
    return response.data;
  },
  refresh: async (body: refreshRequest): Promise<globalResponse<refreshResponse>> => {
    const response = await req.post(`/auth/refresh`, body);
    return response.data;
  },
};
