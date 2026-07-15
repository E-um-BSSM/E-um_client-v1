import styled from "@emotion/styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.5rem;
  width: 100%;
  min-height: 100vh;
  padding: var(--spacing-4xl) var(--spacing-l);
  box-sizing: border-box;
`;

export const TitleSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 2.625rem;
  font-weight: 500;
`;

export const Subtitle = styled.p`
  margin: 0;
  color: var(--natural-500);
  font-family: Pretendard;
  font-size: 1.25rem;
  font-weight: 400;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 30rem;
  padding: var(--spacing-3xl);
  border-radius: 0.75rem;
  background: var(--white);
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: var(--text-primary);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 400;
`;

export const StatusText = styled.p<{ isError: boolean }>`
  margin: 0;
  color: ${({ isError }) => (isError ? "var(--utility-error)" : "var(--primary-500)")};
  font-family: Pretendard;
  font-size: 1rem;
  line-height: 1.25rem;
`;
