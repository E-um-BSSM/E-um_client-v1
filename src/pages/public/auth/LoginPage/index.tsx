import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/atom/Input";
import Button from "@/components/ui/atom/Button";
import CustomCheckbox from "@/components/ui/atom/CustomCheckbox";
import { AxiosError } from "axios";
import {
  Main,
  TitleSection,
  Title,
  Subtitle,
  Form,
  FieldsContainer,
  Field,
  Label,
  BottomContainer,
  RememberContainer,
  RememberText,
  ForgotPassword,
  ButtonContainer,
  SignupContainer,
  SignupText,
  SignupLink,
  ErrorText,
} from "./style";
import type { PageType } from "@/types/Page";
import { useNavigate, useOutletContext } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { useAuthStore } from "@/stores";
import { authGET } from "@/apis/user/auth";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LoginPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();
  const setAuthFromSignIn = useAuthStore(state => state.setAuthFromSignIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBSMPending, setIsBSMPending] = useState(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  const canSubmit = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isPending) return;

    try {
      setErrorMessage("");
      const response = await mutateAsync({ email, password });
      setAuthFromSignIn(response.data, remember);
      navigate("/app");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setErrorMessage(axiosError.response?.data?.message ?? "로그인에 실패했습니다. 입력값을 다시 확인해주세요.");
    }
  };

  const handleBSMLogin = async () => {
    if (isBSMPending) return;

    try {
      setIsBSMPending(true);
      setErrorMessage("");
      const response = await authGET.bsmLogin();
      const redirectUrl = response.data.redirect_url;

      if (!redirectUrl) {
        setErrorMessage("BSM 로그인 리다이렉트 URL이 없습니다.");
        setIsBSMPending(false);
        return;
      }

      try {
        const parsed = new URL(redirectUrl);
        const state = parsed.searchParams.get("state");
        if (state) {
          sessionStorage.setItem("bsm_oauth_state", state);
        }
      } catch {
        // ignore URL parse errors and continue redirect flow
      }

      window.location.href = redirectUrl;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; data?: string }>;
      setErrorMessage(axiosError.response?.data?.message ?? axiosError.response?.data?.data ?? "BSM 로그인 시작에 실패했습니다.");
      setIsBSMPending(false);
    }
  };

  return (
    <Main>
      <TitleSection>
        <Title>로그인</Title>
        <Subtitle>로그인하여 이음의 기능을 모두 사용하세요</Subtitle>
      </TitleSection>
      <Form onSubmit={handleLogin}>
        <FieldsContainer>
          <Field>
            <Label>이메일</Label>
            <Input placeholder="이메일을 입력하세요." value={email} onChange={e => setEmail(e.target.value)} />
          </Field>
          <Field>
            <Label>비밀번호</Label>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Field>
        </FieldsContainer>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <BottomContainer>
          <RememberContainer>
            <CustomCheckbox checked={remember} size={1.5} onChange={() => setRemember(!remember)} />
            <RememberText>로그인 유지하기</RememberText>
          </RememberContainer>
          <ForgotPassword>비밀번호 찾기</ForgotPassword>
        </BottomContainer>
        <ButtonContainer>
          <Button type="submit" activate={canSubmit} disabled={!canSubmit || isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
          <Button type="button" activate={!isBSMPending} disabled={isBSMPending} onClick={handleBSMLogin}>
            {isBSMPending ? "BSM 로그인 중..." : "BSM으로 로그인하기"}
          </Button>
          <SignupContainer>
            <SignupText>계정이 없으신가요?</SignupText>
            <Link to="/auth/signup">
              <SignupLink>회원가입하기</SignupLink>
            </Link>
          </SignupContainer>
        </ButtonContainer>
      </Form>
    </Main>
  );
}

export default LoginPage;
