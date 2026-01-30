/** @jsxImportSource @emotion/react */
import { SearchBarContainer, Content, Text,FilterButton } from "./styles";
import SearchSvg from "@/assets/Search_natural-500.svg";
export function ClassSearchBar() {
  return (
    <SearchBarContainer>
      <Content>
        <Text placeholder="클래스 검색" />
        <FilterButton onClick={() => console.log("검색 클릭!")}>
          <img src={SearchSvg} alt="search-icon" />
        </FilterButton>
      </Content>
    </SearchBarContainer>
  );
}