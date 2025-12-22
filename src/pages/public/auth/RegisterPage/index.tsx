import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { PageType } from "@/types/Page";
import { Button, Input } from "@/components/atom";
import { css } from "@emotion/react";
import {
  AgreeBox,
  EmailInput,
  Field,
  FormSection,
  InfoContainer,
  InputContainer,
  Label,
  Main,
  SubmitContainer,
  TitleSection,
} from "./style";
import { CustomCheckbox } from "@/components/atom";

type PageTypeSetter = React.Dispatch<React.SetStateAction<PageType>>;

function RegisterPage() {
  const setPageType = useOutletContext<PageTypeSetter>();
  const [emailTyped, setEmailTyped] = useState(false);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [email, setEmail] = useState("");
  const [verifyNum, setVerifyNum] = useState("");

  const [agreePersonal, setAgreePersonal] = useState(false);

  useEffect(() => {
    setPageType("public");
  }, [setPageType]);

  return (
    <Main>
      <TitleSection>
        <h1 className="title">회원가입</h1>
        <h3 className="sub-title">환영합니다, 이음과 함께해요!</h3>
      </TitleSection>
      <FormSection>
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
                  placeholder="이메일을 입력하세요."
                  type="email"
                  name="email"
                  customStyle={css`
                    flex: 2 0 0;
                  `}
                  onChange={e => {
                    setEmail(e.target.value);
                    setEmailTyped(e.target.value ? e.target.checkValidity() : false);
                  }}
                  value={email}
                />
                <Button
                  activate={emailTyped}
                  customStyle={css`
                    flex: 1 0 0;
                  `}
                  disabled={!emailTyped}
                >
                  인증번호 전송
                </Button>
              </EmailInput>
              <Input
                placeholder="인증번호를 입력하세요."
                type="text"
                inputMode="numeric"
                maxLength={6}
                pattern="\d*"
                name="verify"
                onChange={e => {
                  const v = e.target.value.replaceAll(/[^0-9]/g, "");
                  setVerifyNum(v);
                }}
                value={verifyNum}
              />
            </Field>
          </InputContainer>
          <AgreeBox>
            <CustomCheckbox checked={agreePersonal} size={1.125} onChange={() => setAgreePersonal(prev => !prev)} />
            개인정보 수집에 동의합니다.
          </AgreeBox>
        </InfoContainer>
        <SubmitContainer></SubmitContainer>
      </FormSection>
    </Main>
  );
}

export default RegisterPage;
