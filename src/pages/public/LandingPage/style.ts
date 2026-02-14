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

export const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
`;

export const HeaderContainer = styled.div`
  padding-left: 80px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  scroll-snap-align: start;
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
  scroll-snap-align: start;
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
`;

export const MentoContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 80px;
  background: linear-gradient(to bottom, #FFFFFF, #E9EFFF);
  scroll-snap-align: start;
`;

export const MentoCard = styled.div`
  padding: 28px;
  min-width: 440px;
  width: 440px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #E7EBEE;
  border-radius: 24px;
  background-color: #FFFFFF;
`;

export const BottomContainer = styled.div`
  height: 100vh;
  scroll-snap-align: start;
`;

export const BottomWrapper = styled.div`
  height: calc(100vh - 401px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #00000090;
`;

export const BottomImg = styled.img`
  width: 100vw;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
`;