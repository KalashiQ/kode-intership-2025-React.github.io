import React from 'react';
import styled from 'styled-components';
import { SearchIcon, SortIcon } from '../../components/Icons';

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 343px;
  height: 43px;
  margin: 6px 0 0 0;
  padding: 8px 12px;
  border-radius: 16px;
  background: #F5F5F5;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  margin-left: 10px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #050510;
  vertical-align: middle;
  
  &::placeholder {
    color: #9E9E9E;
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

const SearchInput: React.FC = () => {
  return (
    <SearchWrapper>
      <SearchIcon />
      <Input placeholder="Введи имя, тег, почту..." />
      <SortButton>
        <SortIcon />
      </SortButton>
    </SearchWrapper>
  );
};

export default SearchInput; 