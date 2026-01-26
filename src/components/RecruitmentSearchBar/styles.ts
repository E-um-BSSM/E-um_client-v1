import styled from "@emotion/styled";

export const SearchBarContainer = styled.div`
 display: flex;
 width: 25rem;
 padding: 0.75rem 1rem;
 flex-direction: column;
 align-items: flex-start;
 gap: 0.625rem;
 border-radius: 0.5rem;
 border: 1px solid var(--Natural-natural-300, #CFD9E0);
 background: var(--white, #FFF);
`;

export const Content = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 align-self: stretch;
`;

export const Text = styled.p`
 flex: 1 0 0;
 color: var(--text-muted, #64748B);
 font-family: Pretendard;
 font-size: 1rem;
 font-style: normal;
 font-weight: 500;
 line-height: 1.25rem;
`;