import styled from "@emotion/styled";
import SearchSvg from "@/assets/Search_natural-500.svg";

interface SearchBarProps {
  placeholder: string;
  width: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
  className?: string;
}

function SearchBar({ placeholder, width, value, onChange, onSearch, className }: SearchBarProps) {
  return (
    <SearchBarContainer width={width} className={className}>
      <Content>
        <Text
          value={value}
          onChange={event => onChange?.(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <SearchButton type="button" onClick={onSearch} aria-label="검색">
          <img src={SearchSvg} alt="" />
        </SearchButton>
      </Content>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div<{ width: string }>`
  display: flex;
  width: ${({ width }) => width};
  padding: 0.75rem 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid var(--natural-300, #cfd9e0);
  background: var(--white, #fff);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Text = styled.input`
  flex: 1 0 0;
  color: var(--text-muted, #64748b);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.25rem;
  border: none;
  background: transparent;
  outline: none;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 15px;
  padding: 0;
`;

export default SearchBar;

