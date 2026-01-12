import { useMutation } from "@tanstack/react-query";
import { authPOST } from "@/apis/user/auth";
import type { signInRequest } from "@/models";

export default function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: signInRequest) => authPOST.signIn({ email: email, password: password }),
  });
}
