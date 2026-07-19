import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Input from "@/components/ui/atom/Input";
import PasswordInput from "@/components/ui/atom/PasswordInput";
import Button from "@/components/ui/atom/Button";
import CustomCheckbox from "@/components/ui/atom/CustomCheckbox";
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
  ModalActions,
  ModalBody,
  ModalOverlay,
  ModalTitle,
  SecondaryButton,
  SuccessText,
} from "./style";
import type { PageType } from "@/types/Page";
import { useNavigate, useOutletContext } from "react-router-dom";
import useLogin from "@/hooks/useLogin";
import { useRequestPasswordReset } from "@/hooks";
import { useAuthStore } from "@/stores";
import { getErrorMessage } from "@/lib/error";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LoginPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync, isPending } = useLogin();
  const { mutateAsync: requestPasswordReset, isPending: isPasswordResetRequestPending } = useRequestPasswordReset();
  const setAuthFromSignIn = useAuthStore(state => state.setAuthFromSignIn);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isResetError, setIsResetError] = useState(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  useEffect(() => {
    if (searchParams.get("reason") === "session_expired") {
      setErrorMessage("보안을 위해 다시 로그인해주세요.");
    }
  }, [searchParams]);

  const canSubmit = nickname.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isPending) return;

    try {
      setErrorMessage("");
      setSuccessMessage("");
      const tokens = await mutateAsync({ username: nickname, password, keep_signed_in: remember });
      setAuthFromSignIn(tokens, { username: nickname }, remember);
      navigate("/app");
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "로그인에 실패했습니다. 입력값을 다시 확인해주세요."));
    }
  };

  const handlePasswordResetRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = resetEmail.trim();
    if (!normalizedEmail || isPasswordResetRequestPending) {
      setIsResetError(true);
      setResetMessage("비밀번호를 재설정할 이메일을 입력해주세요.");
      return;
    }

    try {
      setIsResetError(false);
      setResetMessage("");
      await requestPasswordReset({ email: normalizedEmail });
      setResetMessage("비밀번호 재설정 안내를 이메일로 전송했습니다.");
    } catch (error) {
      setIsResetError(true);
      setResetMessage(getErrorMessage(error, "비밀번호 재설정 요청에 실패했습니다."));
    }
  };

  const openPasswordResetModal = () => {
    setResetEmail("");
    setResetMessage("");
    setIsResetError(false);
    setIsPasswordResetModalOpen(true);
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
            <Label>닉네임</Label>
            <Input placeholder="닉네임을 입력하세요." value={nickname} onChange={e => setNickname(e.target.value)} />
          </Field>
          <Field>
            <Label>비밀번호</Label>
            <PasswordInput
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Field>
        </FieldsContainer>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        {successMessage && <SuccessText>{successMessage}</SuccessText>}
        <BottomContainer>
          <RememberContainer>
            <CustomCheckbox checked={remember} size={1.5} onChange={() => setRemember(!remember)} />
            <RememberText>로그인 유지하기</RememberText>
          </RememberContainer>
          <ForgotPassword type="button" onClick={openPasswordResetModal}>
            비밀번호 찾기
          </ForgotPassword>
        </BottomContainer>
        <ButtonContainer>
          <Button type="submit" activate={canSubmit} disabled={!canSubmit || isPending}>
            {isPending ? "로그인 중..." : "로그인"}
          </Button>
          <SignupContainer>
            <SignupText>계정이 없으신가요?</SignupText>
            <Link to="/auth/signup">
              <SignupLink>회원가입하기</SignupLink>
            </Link>
          </SignupContainer>
        </ButtonContainer>
      </Form>
      {isPasswordResetModalOpen && (
        <ModalOverlay onMouseDown={() => setIsPasswordResetModalOpen(false)}>
          <ModalBody role="dialog" aria-modal="true" aria-labelledby="password-reset-title" onMouseDown={event => event.stopPropagation()}>
            <ModalTitle id="password-reset-title">비밀번호 찾기</ModalTitle>
            <form onSubmit={handlePasswordResetRequest}>
              <Field>
                <Label>이메일</Label>
                <Input
                  type="email"
                  placeholder="가입한 이메일을 입력하세요."
                  value={resetEmail}
                  onChange={event => setResetEmail(event.target.value)}
                  disabled={isPasswordResetRequestPending}
                />
              </Field>
              {resetMessage && (isResetError ? <ErrorText>{resetMessage}</ErrorText> : <SuccessText>{resetMessage}</SuccessText>)}
              <ModalActions>
                <SecondaryButton type="button" onClick={() => setIsPasswordResetModalOpen(false)}>
                  취소
                </SecondaryButton>
                <Button type="submit" activate={resetEmail.trim().length > 0} disabled={!resetEmail.trim() || isPasswordResetRequestPending}>
                  {isPasswordResetRequestPending ? "전송 중..." : "메일 발송"}
                </Button>
              </ModalActions>
            </form>
          </ModalBody>
        </ModalOverlay>
      )}
    </Main>
  );
}

export default LoginPage;
