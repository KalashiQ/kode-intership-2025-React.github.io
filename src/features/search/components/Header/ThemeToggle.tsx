import React from 'react';
import styled from 'styled-components';
import { Moon, Sun } from '../../../../shared/Icons';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;

interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </ToggleButton>
  );
};

export default ThemeToggle; 