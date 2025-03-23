import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../locales/translations';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-transform: uppercase;
`;

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLang: Language = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLang);
  };

  return (
    <ToggleButton onClick={toggleLanguage}>
      {language === 'ru' ? 'EN' : 'RU'}
    </ToggleButton>
  );
};

export default LanguageToggle; 