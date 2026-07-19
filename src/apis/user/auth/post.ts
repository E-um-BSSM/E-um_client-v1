import { req } from "@/apis/axiosInstance";
import type {
  authTokens,
  emailSendRequest,
  emailVerifyRequest,
  passwordResetConfirmRequest,
  passwordResetRequest,
  refreshRequest,
  signinRequest,
  signupRequest,
  verificationResult,
} from "@/models";

export const authPOST = {
  signup: async (body: signupRequest): Promise<authTokens> => {
    const response = await req.post(`/auth/signup`, body);
    return response.data;
  },
  signin: async (body: signinRequest): Promise<authTokens> => {
    const response = await req.post(`/auth/signin`, body);
    return response.data;
  },
  signout: async (body: refreshRequest): Promise<void> => {
    await req.post(`/auth/signout`, body);
  },
  refresh: async (body: refreshRequest): Promise<authTokens> => {
    const response = await req.post(`/auth/refresh`, body);
    return response.data;
  },
  sendEmailCode: async (body: emailSendRequest): Promise<void> => {
    await req.post(`/auth/email/send`, body);
  },
  verifyEmailCode: async (body: emailVerifyRequest): Promise<verificationResult> => {
    const response = await req.post(`/auth/email/verify`, body);
    return response.data;
  },
  requestPasswordReset: async (body: passwordResetRequest): Promise<void> => {
    await req.post(`/auth/password/reset-request`, body);
  },
  resetPassword: async (body: passwordResetConfirmRequest): Promise<void> => {
    await req.post(`/auth/password/reset`, body);
  },
};
