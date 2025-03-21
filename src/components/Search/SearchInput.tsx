import React, { useState } from "react";
import styled from "styled-components";
import { SearchIcon, SortIcon } from "../../components/Icons";
import SortModal from "./SortModal";

interface SearchWrapperProps {
  $isLoading: boolean;
}

const SearchWrapper = styled.div<SearchWrapperProps>`
  display: flex;
  align-items: center;
  width: ${(props) => (props.$isLoading ? "343px" : "100%")};
  height: 43px;
  margin: 6px 0 0 0;
  padding: 8px 12px;
  border-radius: 16px;
  background: #f5f5f5;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  margin-left: 10px;
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #050510;
  vertical-align: middle;

  &::placeholder {
    color: #9e9e9e;
  }

  &:focus {
    outline: none;
  }
`;

const SortButton = styled.button`
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

interface SearchInputProps {
  isLoading: boolean;
  onSortChange: (type: "alphabet" | "birthday" | null) => void;
  sortType: "alphabet" | "birthday" | null;
}

const SearchInput: React.FC<SearchInputProps> = ({
  isLoading,
  onSortChange,
  sortType,
}) => {
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);

  return (
    <>
      <SearchWrapper $isLoading={isLoading}>
        <SearchIcon />
        <Input placeholder="Введи имя, тег, почту..." />
        <SortButton onClick={() => setIsSortModalOpen(true)}>
          <SortIcon />
        </SortButton>
      </SearchWrapper>
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        sortType={sortType}
        onSortChange={onSortChange}
      />
    </>
  );
};

export default SearchInput;
