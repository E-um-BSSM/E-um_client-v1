import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
  margin: 8rem auto;
  width: 30rem;
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
    font-size: 2.625rem;
    font-weight: 500;
    letter-spacing: -0.05775rem;
  }

  & .sub-title {
    color: var(--natural-500);
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: -0.0385rem;
  }
`;

export const FormSection = styled.form`
  display: flex;
  width: 30rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2.5rem;
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
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  ${({ required }) =>
    required &&
    `&::after {
      content: "*";
      color: var(--utility-error);
      margin-left: 0.25rem;
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
  padding-left: 0.5rem;
  align-items: center;
  gap: 0.25rem;

  color: var(--text-primary);
  text-align: right;
  font-family: Pretendard;
  font-size: 1.125rem;
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
