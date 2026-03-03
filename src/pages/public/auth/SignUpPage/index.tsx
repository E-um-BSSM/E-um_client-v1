import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PageType } from "@/types/Page";
import { css } from "@emotion/react";
import { Button, Input } from "@/components/ui/atom";
import { AxiosError } from "axios";
import {
  AgreeBox,
  EmailInput,
  Field,
  FormSection,
  InfoContainer,
  InputContainer,
  Label,
  Main,
  MoveLogin,
  RegisterBtn,
  StatusText,
  SubmitContainer,
  TitleSection,
} from "./style";
import { CustomCheckbox } from "@/components/ui/atom";
import { useNavigate } from "react-router-dom";
import { authPOST } from "@/apis/user/auth";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function SignUpPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const navigate = useNavigate();
  const [emailTyped, setEmailTyped] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phone, setPhone] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [agreePersonal, setAgreePersonal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  useEffect(() => {
    if (remainingSeconds <= 0 || isEmailVerified) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [remainingSeconds, isEmailVerified]);

  const formatRemainingTime = (value: number) => {
    const minutes = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isCodeSent = remainingSeconds > 0 || isEmailVerified;

  const handleSendVerificationCode = async () => {
    if (!emailTyped || isSendingCode) return;

    try {
      setIsSendingCode(true);
      setIsError(false);
      setStatusMessage("");
      await authPOST.sendVerificationCode({ email });
      setIsEmailVerified(false);
      setVerificationCode("");
      setRemainingSeconds(300);
      setStatusMessage("인증번호를 전송했습니다. 5분 내에 인증해주세요.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setIsError(true);
      setStatusMessage(axiosError.response?.data?.message ?? "인증번호 전송에 실패했습니다.");
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!verificationCode.trim() || isVerifyingCode) return;
    if (remainingSeconds <= 0) {
      setIsError(true);
      setStatusMessage("인증번호가 만료되었습니다. 다시 전송해주세요.");
      return;
    }

    try {
      setIsVerifyingCode(true);
      setIsError(false);
      await authPOST.verifyEmailCode({ email, code: verificationCode.trim() });
      setIsEmailVerified(true);
      setStatusMessage("이메일 인증이 완료되었습니다.");
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setIsError(true);
      setStatusMessage(axiosError.response?.data?.message ?? "인증번호 확인에 실패했습니다.");
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const canSubmit =
    id.trim().length > 0 &&
    pw.trim().length > 0 &&
    checkPw.trim().length > 0 &&
    emailTyped &&
    isEmailVerified &&
    phone.trim().length > 0 &&
    agreePersonal;

  const handleEmailAuthAction = async () => {
    if (isCodeSent && !isEmailVerified) {
      await handleVerifyEmailCode();
      return;
    }
    await handleSendVerificationCode();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || isSubmitting) return;

    if (pw !== checkPw) {
      setIsError(true);
      setStatusMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setIsSubmitting(true);
      setIsError(false);
      setStatusMessage("");

      await authPOST.signUp({
        username: id,
        email,
        password: pw,
        phone,
        auth_provider: "LOCAL",
      });

      setStatusMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      setTimeout(() => navigate("/auth/login"), 1000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setIsError(true);
      setStatusMessage(axiosError.response?.data?.message ?? "회원가입에 실패했습니다. 입력값을 다시 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Main>
      <TitleSection>
        <h1 className="title">회원가입</h1>
        <h3 className="sub-title">환영합니다, 이음과 함께해요!</h3>
      </TitleSection>
      <FormSection onSubmit={handleSubmit}>
        <InfoContainer>
          <InputContainer>
            <Field>
              <Label required>아이디</Label>
              <Input
                placeholder="아이디를 입력하세요."
                type="text"
                id="id"
                onChange={e => setId(e.target.value)}
                value={id}
              />
            </Field>
            <Field>
              <Label required>비밀번호</Label>
              <Input
                placeholder="비밀번호를 입력하세요."
                type="password"
                name="pw"
                onChange={e => setPw(e.target.value)}
                value={pw}
              />
            </Field>
            <Field>
              <Label required>비밀번호 확인</Label>
              <Input
                placeholder="비밀번호를 입력하세요."
                type="password"
                name="check-pw"
                onChange={e => setCheckPw(e.target.value)}
                value={checkPw}
              />
            </Field>
            <Field>
              <Label required>이메일</Label>
              <EmailInput>
                <Input
                  placeholder={isCodeSent ? "인증번호를 입력하세요." : "이메일을 입력하세요."}
                  type={isCodeSent ? "text" : "email"}
                  name={isCodeSent ? "verification-code" : "email"}
                  onChange={e => {
                    if (isCodeSent) {
                      setVerificationCode(e.target.value);
                      return;
                    }

                    setEmail(e.target.value);
                    setEmailTyped(e.target.value ? e.target.checkValidity() : false);
                    setIsEmailVerified(false);
                  }}
                  value={isCodeSent ? verificationCode : email}
                  disabled={isEmailVerified}
                  customStyle={css`
                    flex: 2 0 0;
                  `}
                />
                <Button
                  type="button"
                  activate={
                    isCodeSent
                      ? verificationCode.trim().length > 0 && remainingSeconds > 0 && !isEmailVerified
                      : emailTyped && !isSendingCode
                  }
                  disabled={
                    isCodeSent
                      ? verificationCode.trim().length === 0 || remainingSeconds <= 0 || isVerifyingCode || isEmailVerified
                      : !emailTyped || isSendingCode
                  }
                  onClick={handleEmailAuthAction}
                  customStyle={css`
                    flex: 1 0 0;
                  `}
                >
                  {isEmailVerified
                    ? "인증 완료"
                    : isCodeSent
                      ? isVerifyingCode
                        ? "인증 중..."
                        : "인증번호 인증"
                      : isSendingCode
                        ? "전송 중..."
                        : "인증번호 전송"}
                </Button>
              </EmailInput>
              {remainingSeconds > 0 && !isEmailVerified && (
                <StatusText>인증코드 유효시간: {formatRemainingTime(remainingSeconds)}</StatusText>
              )}
              <Input
                placeholder="전화번호를 입력하세요. (예: 01012345678)"
                type="tel"
                name="phone"
                onChange={e => setPhone(e.target.value)}
                value={phone}
              />
            </Field>
          </InputContainer>
          <AgreeBox>
            <CustomCheckbox checked={agreePersonal} size={1.125} onChange={() => setAgreePersonal(prev => !prev)} />
            개인정보 수집에 동의합니다.
          </AgreeBox>
        </InfoContainer>
        <SubmitContainer>
          {statusMessage && <StatusText error={isError}>{statusMessage}</StatusText>}
          <RegisterBtn type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? "회원가입 중..." : "회원가입하기"}
          </RegisterBtn>
          <MoveLogin to="/auth/login">BSM으로 로그인하기</MoveLogin>
        </SubmitContainer>
      </FormSection>
    </Main>
  );
}

export default SignUpPage;
