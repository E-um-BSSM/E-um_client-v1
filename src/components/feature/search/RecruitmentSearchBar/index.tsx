import { SearchBar } from "@/components/ui/atom";

interface RecruitmentSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export function RecruitmentSearchBar({ value, onChange, onSearch }: RecruitmentSearchBarProps) {
  return (
    <SearchBar
      width="25rem"
      placeholder="멘토 이름, 카테고리, 난이도 별로 검색해요"
      value={value}
      onChange={onChange}
      onSearch={onSearch}
    />
  );
}
