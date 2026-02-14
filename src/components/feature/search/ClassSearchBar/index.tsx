import { SearchBar } from "@/components/ui/atom";

interface ClassSearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

export function ClassSearchBar({ value, onChange, onSearch }: ClassSearchBarProps) {
  return <SearchBar width="12.5rem" placeholder="클래스 검색" value={value} onChange={onChange} onSearch={onSearch} />;
}
