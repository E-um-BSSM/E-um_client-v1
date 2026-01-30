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
type Gap = '4px' | '8px' | '12px' | '16px' | '20px';
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
  font-size: 30px;
  font-weight: 600;
`;

export const Text = styled.p<{
  color: TextColor;
  weight: TextWeight;
}>`
  color: ${({color}) => TextColorValues[color]};
  font-size: 18px;
  font-weight: ${({weight}) => TextWeightValues[weight]};
`;

export const Button = styled.button`
  padding: 12px 20px;
  color: #FFFFFF;
  font-size: 16px;
  font-wieght: 400;
  border-radius: 9999px;
  background-color: #235FFF;
`;

export const HeaderContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 60px;
`;