import {Container,CardBanner, TextContainer,Profile} from "./style";

export default function MyMentoringCard() {
 return(
  <>
   <Container>
    <CardBanner/>
    <TextContainer>
     <Profile>
      <p style={{ color: "var(--text-primary, #0F172A)" }}>멘토링 이름</p>
      <p style={{ color: "var(--text-muted, #64748B)" }}>멘토 이름</p>
     </Profile>
    </TextContainer>
   </Container>
  </>
 );
}