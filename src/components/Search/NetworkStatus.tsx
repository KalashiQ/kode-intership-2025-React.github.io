import React from "react";
import styled from "styled-components";
import { useLanguage } from '../../context/LanguageContext';

const StatusContainer = styled.div<{ $isError?: boolean }>`
  background: ${props => props.$isError ? "#F44336" : "#6534FF"};
  padding: 12px 16px;
  height: 100%;
  width: calc(100% + 32px);
  margin: -8px -16px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-family: Inter;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #FFFFFF;
  margin: 8px 0 20px;
  padding: 0;
`;

const Message = styled.p`
  font-family: Inter;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #FFFFFF;
  margin: 0;
`;

interface NetworkStatusProps {
  isOnline: boolean;
  isLoading: boolean;
}

const NetworkStatus: React.FC<NetworkStatusProps> = ({ isOnline, isLoading }) => {
  const { t } = useLanguage();
  
  if (isOnline && !isLoading) return null;

  return (
    <StatusContainer $isError={!isOnline}>
      <Title>{t('search.title')}</Title>
      <Message>
        {!isOnline 
          ? t('search.network.offline')
          : t('search.network.loading')
        }
      </Message>
    </StatusContainer>
  );
};

export default NetworkStatus; 