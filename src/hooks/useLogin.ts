import { useMutation } from "@tanstack/react-query";
import { authPOST } from "@/apis/user/auth";
import type { signinRequest } from "@/models";

/** 로그인 뮤테이션. authTokens 를 반환한다. */
export default function useLogin() {
  return useMutation({
    mutationFn: (body: signinRequest) => authPOST.signin(body),
  });
}
