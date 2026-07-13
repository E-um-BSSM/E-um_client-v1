import { useMutation, useQuery } from "@tanstack/react-query";
import { authGET, authPOST } from "@/apis/user/auth";
import type {
  emailSendRequest,
  emailVerifyRequest,
  passwordResetConfirm,
  passwordResetRequest,
  signinRequest,
  signupRequest,
} from "@/models";

export const authKeys = {
  all: ["auth"] as const,
  checkUsername: (username: string) => ["auth", "check-username", username] as const,
  checkEmail: (email: string) => ["auth", "check-email", email] as const,
};

/** 아이디 중복 확인. username 이 있을 때만 조회. */
export function useCheckUsername(username: string, enabled = true) {
  return useQuery({
    queryKey: authKeys.checkUsername(username),
    queryFn: () => authGET.checkUsername(username),
    enabled: enabled && username.trim().length > 0,
  });
}

/** 이메일 중복 확인. email 이 있을 때만 조회. */
export function useCheckEmail(email: string, enabled = true) {
  return useQuery({
    queryKey: authKeys.checkEmail(email),
    queryFn: () => authGET.checkEmail(email),
    enabled: enabled && email.trim().length > 0,
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (body: signupRequest) => authPOST.signup(body),
  });
}

export function useSignin() {
  return useMutation({
    mutationFn: (body: signinRequest) => authPOST.signin(body),
  });
}

export function useSignout() {
  return useMutation({
    mutationFn: () => authPOST.signout(),
  });
}

export function useSendEmailCode() {
  return useMutation({
    mutationFn: (body: emailSendRequest) => authPOST.sendEmailCode(body),
  });
}

export function useVerifyEmailCode() {
  return useMutation({
    mutationFn: (body: emailVerifyRequest) => authPOST.verifyEmailCode(body),
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (body: passwordResetRequest) => authPOST.requestPasswordReset(body),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (body: passwordResetConfirm) => authPOST.resetPassword(body),
  });
}
