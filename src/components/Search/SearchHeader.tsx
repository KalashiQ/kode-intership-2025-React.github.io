import React from 'react';
import styled from 'styled-components';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../../context/LanguageContext';

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

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

interface SearchHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ isDark, toggleTheme }) => {
  const { t } = useLanguage();

  return (
    <HeaderContainer>
      <Title>{t('search.title')}</Title>
      <Controls>
        <LanguageToggle />
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      </Controls>
    </HeaderContainer>
  );
};

export default SearchHeader; 