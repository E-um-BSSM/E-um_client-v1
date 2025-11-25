import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FooterType } from "@/types/Page";
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
import CustomCheckbox from "@/components/atom/CustomCheckBox";

type FooterTypeSetter = React.Dispatch<React.SetStateAction<FooterType>>;

function LoginPage() {
  const setFooterType = useOutletContext<FooterTypeSetter>();
  const [emailTyped, setEmailTyped] = useState(false);

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [email, setEmail] = useState("");
  const [verifyNum, setVerifyNum] = useState("");

  const [agreePersonal, setAgreePersonal] = useState(false);

  useEffect(() => {
    setFooterType("public");
  }, [setFooterType]);

  const updateValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setter(e.target.value);
  };

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
                onChange={e => updateValue(e, setId)}
                value={id}
              />
            </Field>
            <Field>
              <Label required>비밀번호</Label>
              <Input
                placeholder="비밀번호를 입력하세요."
                type="password"
                name="pw"
                onChange={e => updateValue(e, setPw)}
                value={pw}
              />
            </Field>
            <Field>
              <Label required>비밀번호 확인</Label>
              <Input
                placeholder="비밀번호를 입력하세요."
                type="password"
                name="check-pw"
                onChange={e => updateValue(e, setCheckPw)}
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
                    updateValue(e, setEmail);
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
                type="number"
                name="verify"
                onChange={e => updateValue(e, setVerifyNum)}
                value={verifyNum}
              />
            </Field>
          </InputContainer>
          <AgreeBox>
            <CustomCheckbox checked={agreePersonal} size={18} onClick={() => setAgreePersonal(prev => !prev)} />
            개인정보 수집에 동의합니다.
          </AgreeBox>
        </InfoContainer>
        <SubmitContainer></SubmitContainer>
      </FormSection>
    </Main>
  );
}

export default LoginPage;
