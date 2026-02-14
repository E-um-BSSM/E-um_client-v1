import styled from "@emotion/styled";

export const Container = styled.div`
 display: inline-flex;
 padding: 2.25rem 2.5rem;
 flex-direction: column;
 justify-content: center;
 align-items: flex-start;
 width: 18rem;
 gap: 0.75rem;
 border-radius: var(--L, 1.5rem);
 border: 1px solid var(--natural-300, #CFD9E0);
`;

export const Info = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 gap: 0.75rem;
`;

export const Profile = styled.div`
 display: flex;
 align-items: center;
 gap: 0.5rem;
 font-family: Pretendard;
 font-size: 1.375rem;
 font-style: normal;
 font-weight: 500;
 line-height: 1.625rem;
`;

export const Description = styled.p`
 display: -webkit-box;
 width: 18rem;
 -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
 overflow: hidden;
 color: var(--text-primary, #0F172A);
 text-overflow: ellipsis;
 font-family: Pretendard;
 font-size: 1.25rem;
 font-style: normal;
 font-weight: 400;
 line-height: 1.5rem; /* 120% */
`;
