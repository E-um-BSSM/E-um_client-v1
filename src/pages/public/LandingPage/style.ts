import styled from "@emotion/styled";

const FontSizeValues = {
  title: '3rem',
  subtitle: '2.4rem',
  text: '1.6rem',
  caption: '1.3rem',
} as const;

const TextColorValues = {
  highlight: '#235FFF',
  primary: '#0F172A',
  secondary: '#334155',
  disabled: '#64748B',
  muted: '#FFFFFF',
} as const;

const TextWeightValues = {
  regular: '400',
  semibold: '600',
} as const;

type FontSize = keyof typeof FontSizeValues;
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

export const Text = styled.p<{
  color: TextColor;
  size: FontSize;
  weight: TextWeight;
}>`
  color: ${({color}) => TextColorValues[color]};
  font-size: ${({size}) => FontSizeValues[size]};
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

export const FeatureContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  background-color: #4F7FFF;
`;

export const FeatureCard = styled.div`
  padding: 24px;
  width: 280px;
  height: 140px;
  color: #FFFFFF;
  text-align: center;
  font-size: 1.5rem;
  font-wieght: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #FFFFFF;
  border-radius: 24px;
  background-color: #9AB5FF;
`