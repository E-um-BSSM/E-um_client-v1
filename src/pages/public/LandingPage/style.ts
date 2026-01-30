import styled from "@emotion/styled";

const TextColorValues = {
  highlight: '#235FFF',
  primary: '#0F172A',
  secondary: '#334155',
  muted: '#64748B',
} as const;

const TextWeightValues = {
  regular: '400',
  semibold: '600',
} as const;

type TextColor = keyof typeof TextColorValues;
type TextWeight = keyof typeof TextWeightValues;
type Gap = '4px' | '8px' | '12px' | '16px' | '20px' | '28px';
type Align = 'flex-start' | 'center';

export const Row = styled.div<{
  gap: Gap;
  align: Align;
}>`
  display: flex;
  flex-direction: row;
  align-items: ${({align}) => align};
  gap: ${({gap}) => gap};
`;

export const Stack = styled.div<{
  gap: Gap;
  align: Align;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({align}) => align};
  gap: ${({gap}) => gap};
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

export const Text = styled.p<{
  color: TextColor;
  weight: TextWeight;
}>`
  color: ${({color}) => TextColorValues[color]};
  font-size: 1.6rem;
  font-weight: ${({weight}) => TextWeightValues[weight]};
`;

export const Button = styled.button`
  padding: 16px 24px;
  color: #FFFFFF;
  font-size: 1.3rem;
  font-wieght: 400;
  border-radius: 9999px;
  background-color: #235FFF;
`;

export const HeaderContainer = styled.div`
  padding-left: 80px;
  height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const HeaderImg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;