import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 1.5rem 5rem 15.62rem 5rem;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const MyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  align-self: stretch;
`;

export const RecentMentoringEmpty = styled.div`
  display: flex;
  width: 100%;
  height: 14.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border-radius: var(--S, 0.75rem);
  background: var(--Natural-natural-100, #f7f9fa);
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  flex-shrink: 0;
`;

export const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5rem;
  align-self: stretch;
`;

export const MyMentoringCardContainer = styled.div<{ isEmpty: boolean }>`
  align-self: stretch;

  ${({ isEmpty }) =>
    isEmpty
      ? `
    display: flex;
  `
      : `
    display: grid;
    grid-template-columns: repeat(4, 17.5rem);
    gap: 2.25rem;
    justify-content: space-between;
  `}
`;
export const Text = styled.p`
  color: var(--Text-text-primary, #0f172a);

  /* Body/Paragraph Medium */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 133.333% */
`;
export const Cnt = styled.span`
  color: var(--Primary-primary-500, #235fff);

  /* Body/Paragraph Medium */
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 133.333% */
`;

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

export const MyRecruitmentCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.25rem;
  align-self: stretch;
  flex-wrap: wrap;
`;

export const InviteJoinArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 1rem;
`;

export const InviteJoinButton = styled.button`
  display: inline-flex;
  min-width: 15rem;
  height: 3.5rem;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: var(--S, 0.75rem);
  background: var(--Primary-primary-500, #235fff);
  color: var(--White, #fff);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: var(--Primary-primary-700, #1943b5);
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  background: rgba(15, 23, 42, 0.45);
`;

export const ModalPanel = styled.div`
  display: flex;
  width: min(100%, 27.5rem);
  flex-direction: column;
  gap: 1.25rem;
  border-radius: var(--S, 0.75rem);
  background: #fff;
  padding: 1.5rem;
  box-shadow: 0 1.25rem 3rem rgba(15, 23, 42, 0.18);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: var(--Text-text-primary, #0f172a);
  font-family: Pretendard;
  font-size: 1.5rem;
  font-weight: 700;
`;

export const ModalCloseButton = styled.button`
  border: 0;
  border-radius: 0.5rem;
  background: transparent;
  color: var(--Natural-natural-500, #67728a);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: var(--Natural-natural-100, #f7f9fa);
  }
`;

export const InviteJoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const InviteJoinInput = styled.input`
  height: 3.5rem;
  box-sizing: border-box;
  border: 1px solid var(--Natural-natural-300, #cfd9e0);
  border-radius: var(--S, 0.75rem);
  padding: 0 1rem;
  color: var(--Text-text-primary, #0f172a);
  font-family: Pretendard;
  font-size: 1rem;

  &:focus {
    outline: 2px solid var(--Primary-primary-500, #235fff);
    outline-offset: 1px;
  }
`;

export const InviteJoinMessage = styled.p<{ isSuccess: boolean }>`
  margin: 0;
  color: ${({ isSuccess }) => (isSuccess ? 'var(--Utility-success, #5db057)' : 'var(--Utility-error, #ff1c30)')};
  font-family: Pretendard;
  font-size: 0.875rem;
  font-weight: 500;
`;
