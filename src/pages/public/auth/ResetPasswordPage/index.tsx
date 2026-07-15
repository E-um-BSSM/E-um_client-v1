import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import { Button, PasswordInput } from "@/components/ui/atom";
import { useResetPassword } from "@/hooks";
import type { PageType } from "@/types/Page";
import {
  Field,
  Form,
  Label,
  Main,
  StatusText,
  Subtitle,
  Title,
  TitleSection,
} from "./style";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function ResetPasswordPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [statusMessage, setStatusMessage] = useState(token ? "" : "유효하지 않은 비밀번호 재설정 링크입니다.");
  const [isError, setIsError] = useState(!token);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  const canSubmit =
    token.length > 0 && password.length >= 8 && passwordConfirmation.length >= 8 && password === passwordConfirmation;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending || !token) return;

    if (password.length < 8) {
      setIsError(true);
      setStatusMessage("비밀번호는 8자 이상으로 입력해주세요.");
      return;
    }

    if (password !== passwordConfirmation) {
      setIsError(true);
      setStatusMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      setIsError(false);
      setStatusMessage("");
      await resetPassword({ token, new_password: password });
      setStatusMessage("비밀번호가 재설정되었습니다. 로그인 페이지로 이동합니다.");
      window.setTimeout(() => navigate("/auth/login"), 1000);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      setIsError(true);
      setStatusMessage(axiosError.response?.data?.message ?? "비밀번호 재설정에 실패했습니다. 링크를 다시 확인해주세요.");
    }
  };

  return (
    <Main>
      <TitleSection>
        <Title>비밀번호 재설정</Title>
        <Subtitle>새 비밀번호를 입력해주세요.</Subtitle>
      </TitleSection>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>새 비밀번호</Label>
          <PasswordInput
            placeholder="8자 이상 입력하세요."
            value={password}
            onChange={event => setPassword(event.target.value)}
            disabled={!token || isPending}
          />
        </Field>
        <Field>
          <Label>새 비밀번호 확인</Label>
          <PasswordInput
            placeholder="새 비밀번호를 다시 입력하세요."
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
            disabled={!token || isPending}
          />
        </Field>
        {statusMessage && <StatusText isError={isError}>{statusMessage}</StatusText>}
        <Button type="submit" activate={canSubmit} disabled={!canSubmit || isPending}>
          {isPending ? "재설정 중..." : "비밀번호 재설정"}
        </Button>
      </Form>
    </Main>
  );
}

export default ResetPasswordPage;
