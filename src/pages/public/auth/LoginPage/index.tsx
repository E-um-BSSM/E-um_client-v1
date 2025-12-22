import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Input from "@/components/atom/Input";
import Button from "@/components/atom/Button";
import CustomCheckbox from "@/components/atom/CustomCheckbox";
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
} from "./style";
import type { PageType } from "@/types/Page";
import { useOutletContext } from "react-router-dom";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function LoginPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  return (
    <Main>
      <TitleSection>
        <Title>로그인</Title>
        <Subtitle>로그인하여 이음의 기능을 모두 사용하세요</Subtitle>
      </TitleSection>
      <Form>
        <FieldsContainer>
          <Field>
            <Label>아이디</Label>
            <Input placeholder="아이디를 입력하세요." value={id} onChange={e => setId(e.target.value)} />
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
        <BottomContainer>
          <RememberContainer>
            <CustomCheckbox checked={remember} size={1.5} onChange={() => setRemember(!remember)} />
            <RememberText>로그인 유지하기</RememberText>
          </RememberContainer>
          <ForgotPassword>비밀번호 찾기</ForgotPassword>
        </BottomContainer>
        <ButtonContainer>
          <Button activate={true}>로그인</Button>
          <Button activate={false}>BSM으로 로그인하기</Button>
          <SignupContainer>
            <SignupText>계정이 없으신가요?</SignupText>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <SignupLink>회원가입하기</SignupLink>
            </Link>
          </SignupContainer>
        </ButtonContainer>
      </Form>
    </Main>
  );
}

export default LoginPage;
