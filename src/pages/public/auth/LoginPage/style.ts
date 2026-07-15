import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-4xl) var(--spacing-l);
  box-sizing: border-box;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const Title = styled.p`
  font-family: Pretendard;
  font-size: 2.625rem;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.05775rem;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-family: Pretendard;
  font-size: 1.75rem;
  font-weight: 400;
  color: var(--natural-500);
  letter-spacing: -0.0385rem;
  margin: 0;
`;

export const Form = styled.form`
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  align-items: center;
  width: 30rem;
  padding: var(--spacing-3xl);
  border-radius: 0.75rem;
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const Label = styled.p`
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
`;

export const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 var(--spacing-xs);
`;

export const RememberContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
`;

export const RememberText = styled.p`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
`;

export const ForgotPassword = styled.button`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--primary-500);
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const SignupContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SignupText = styled.p`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
`;

export const SignupLink = styled.p`
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--primary-500);
  margin: 0;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  width: 100%;
  margin: 0;
  color: var(--utility-error);
  font-family: Pretendard;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25rem;
`;

export const SuccessText = styled(ErrorText)`
  color: var(--primary-500);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-l);
  background: rgb(15 23 42 / 45%);
  z-index: 20;
`;

export const ModalBody = styled.div`
  width: min(100%, 28rem);
  padding: var(--spacing-xl);
  border-radius: 0.75rem;
  background: var(--white);

  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-m);
  }
`;

export const ModalTitle = styled.h2`
  margin: 0 0 var(--spacing-l);
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 600;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: var(--spacing-s);
  justify-content: flex-end;

  button {
    width: auto;
    min-width: 6rem;
  }
`;

export const SecondaryButton = styled.button`
  padding: 1rem 1.5rem;
  border: 1px solid var(--natural-300);
  border-radius: 0.75rem;
  background: var(--white);
  color: var(--text-primary);
  cursor: pointer;
  font-family: Pretendard;
  font-size: 1.125rem;
`;
