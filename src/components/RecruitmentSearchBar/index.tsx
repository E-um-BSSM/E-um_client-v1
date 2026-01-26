/** @jsxImportSource @emotion/react */
import { SearchBarContainer,Content,Text  } from "@/components/RecruitmentSearchBar/styles";
import SearchSvg from "@/assets/Search_natural-500.svg";
export function RecruitmentSearchBar() {
 return(
  <SearchBarContainer>
   <Content>
    <Text placeholder="멘토 이름, 카테고리, 난이도 별로 검색해요"/>
    <img src={SearchSvg} alt="search-icon"/>
   </Content>
  </SearchBarContainer>
 );
}