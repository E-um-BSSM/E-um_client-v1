import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  justify-content: center;
  background-color: var(--white);
`;

export const Inner = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 500;
  color: #1d1d1d;
  margin-bottom: 2.5rem;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.375rem;
  font-weight: 500;
  color: #1d1d1d;
`;

export const SectionDesc = styled.p`
  font-size: 1.125rem;
  color: var(--text-muted);
`;

export const BannerWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  width: 100%;
`;

export const BannerPreview = styled.div<{ bgImage?: string | null }>`
  width: 25rem;
  height: 13.4375rem;
  background-color: var(--natural-100);
  background-image: ${props => (props.bgImage ? `url(${props.bgImage})` : "none")};
  background-size: cover;
  background-position: center;
  border-radius: 0.75rem;
  shrink-0: 0;
`;

export const FileSelectionWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FileNameInput = styled.div`
  flex: 1;
  height: 3.5rem;
  padding: 1rem 1.5rem;
  background-color: var(--white);
  border: 1px solid var(--natural-300);
  border-radius: 0.75rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
  display: flex;
  align-items: center;
`;

export const UploadButton = styled.label`
  height: 2.75rem;
  padding: 0 1rem;
  background-color: var(--white);
  border: 1px solid var(--primary-200);
  border-radius: 0.5rem;
  color: var(--primary-500);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--natural-300);
  font-size: 1.125rem;
  resize: none;
  font-family: Pretendard;

  &:focus {
    outline: none;
    border: 1px solid var(--primary-500);
  }
`;

export const PrivacyGrid = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export const PrivacyBox = styled.div<{ active: boolean }>`
  flex: 1;
  height: 8.75rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${props => (props.active ? "var(--primary-500)" : "var(--natural-300)")};
  background-color: var(--white);
  display: flex;
  gap: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-300);
  }
`;

export const RadioCircle = styled.div<{ active: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 1px solid ${props => (props.active ? "var(--primary-500)" : "var(--natural-300)")};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.125rem;

  &::after {
    content: "";
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: var(--primary-500);
    display: ${props => (props.active ? "block" : "none")};
  }
`;

export const PrivacyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PrivacyTitle = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-primary);
`;

export const PrivacyDesc = styled.span`
  font-size: 1.125rem;
  color: var(--text-muted);
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2.5rem;
`;
