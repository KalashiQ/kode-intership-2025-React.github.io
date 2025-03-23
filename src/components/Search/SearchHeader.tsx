import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  line-height: 28px;
  margin: 20px 0 20px 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

interface SearchHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ isDark, toggleTheme }) => {
  return (
    <HeaderContainer>
      <Title>Поиск</Title>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
    </HeaderContainer>
  );
};

export default SearchHeader; 