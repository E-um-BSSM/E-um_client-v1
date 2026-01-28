import {Container,CardBanner, TextContainer,Profile} from "./style";

export function MiniMentoringCard({title,lecturer}:{title:string;lecturer:string}) {
 return(
  <>
   <Container>
    <CardBanner/>
    <TextContainer>
     <Profile>
      <p style={{ color: "var(--text-primary, #0F172A)" }}>{title}</p>
      <p style={{ color: "var(--text-muted, #64748B)" }}>{lecturer}</p>
     </Profile>
    </TextContainer>
   </Container>
  </>
 );
}