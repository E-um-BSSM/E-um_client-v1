import styled from "@emotion/styled";

export const BodyContainer = styled.div`
 display: flex;
 width: 100%;
 padding: 4.4375rem 8.25rem;
 justify-content: center;
 align-items: center;
 box-sizing: border-box;
`;

export const ContentContainer = styled.div`
 display: flex;
 width: 100%;
 flex-direction: column;
 align-items: flex-start;
 gap: 2.25rem;
 flex-shrink: 0;
`;

export const WriteGenerateContainer = styled.div`
 display: flex;
 width: 100%;
 flex-direction: column;
 align-items: flex-start;
 gap: 1.5rem;
`;

export const DialogContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 gap: 0.25rem;
`;

export const FindContainer = styled.div`
 display: flex;
 width: 73.5rem;
 flex-direction: column;
 align-items: flex-start;
 gap: 1.5rem;
`;

export const Title = styled.p`
 color: var(--text-primary, #0f172a);
 font-family: Pretendard;
 font-size: 1.75rem;
 font-style: normal;
 font-weight: 600;
 line-height: 3rem; /* 171.429% */
`;
export const Description = styled.p`
 color: var(--Natural-natural-500, #67728A);
 font-family: Pretendard;
 font-size: 1.25rem;
 font-style: normal;
 font-weight: 500;
 line-height: 2.25rem; /* 180% */
`;

export const FindDialogContainer = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: flex-end;
 align-self: stretch;
 width: 100%;
`;

export const AllViwe = styled.p`
 color: var(--Natural-natural-500, #67728A);
 font-family: Pretendard;
 font-size: 1.25rem;
 font-style: normal;
 font-weight: 400;
 line-height: 1.5rem; /* 120% */
`;
export const CardContainer = styled.div`
 display: grid;
 grid-template-columns: repeat(3, 1fr); /* 3 columns */
 grid-template-rows: repeat(2, auto);   /* 2 rows */
 column-gap: 2.25rem;
 row-gap: 1.75rem;
 max-width: 900px;
`;