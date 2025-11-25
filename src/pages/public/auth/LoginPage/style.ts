import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;
  margin: 128px auto;
  width: 480px;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: Pretendard;
  font-style: normal;
  line-height: normal;

  & .title {
    color: var(--text-primary);
    font-size: 42px;
    font-weight: 500;
    letter-spacing: -0.924px;
  }

  & .sub-title {
    color: var(--natural-500);
    font-size: 28px;
    font-weight: 400;
    letter-spacing: -0.616px;
  }
`;

export const FormSection = styled.form`
  display: flex;
  width: 480px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-s);
  align-self: stretch;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-m);
  align-self: stretch;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-xs);
  align-self: stretch;
`;

export const Label = styled.label<{ required?: boolean }>`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ${({ required }) =>
    required &&
    `&::after {
      content: "*";
      color: var(--utility-error);
      margin-left: 4px;
    }`}
`;

export const EmailInput = styled.div`
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-xs);
  align-self: stretch;
`;

export const AgreeBox = styled.span`
  display: flex;
  padding-left: 8px;
  align-items: center;
  gap: 4px;

  color: var(--text-primary);
  text-align: right;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const SubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-m);
  align-self: stretch;
`;
