/** @jsxImportSource @emotion/react */
import { SearchBarContainer,Content,Text  } from "./styles";
import SearchSvg from "@/assets/Search_natural-500.svg";
export function ClassSearchBar() {
 return(
  <SearchBarContainer>
   <Content>
    <Text placeholder="클래스 검색"/>
    <img src={SearchSvg} alt="search-icon"/>
   </Content>
  </SearchBarContainer>
 );
}