import React from "react";
import styled from "styled-components";
import flyingSaucer from "../../assets/flying-saucer_1f6f8.svg";
import { useLanguage } from '../../context/LanguageContext';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(70vh - 136px);
  padding: 24px;
  width: 100%;
`;

const ErrorImage = styled.img`
  margin-bottom: 8px;
  width: 56px;
  height: 56px;
`;

const ErrorTitle = styled.h3`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: #050510;
  margin-bottom: 12px;
`;

const ErrorSubtitle = styled.p`
  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #97979b;
  margin-bottom: 12px;
`;

const RetryButton = styled.button`
  font-family: "Inter", sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #6534ff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

interface UserListErrorProps {
  onRetry: () => void;
}

const UserListError: React.FC<UserListErrorProps> = ({ onRetry }) => {
  const { t } = useLanguage();
  
  return (
    <ErrorContainer>
      <ErrorImage src={flyingSaucer} alt="Error" />
      <ErrorTitle>{t('search.error.title')}</ErrorTitle>
      <ErrorSubtitle>{t('search.error.subtitle')}</ErrorSubtitle>
      <RetryButton onClick={onRetry}>{t('search.error.retry')}</RetryButton>
    </ErrorContainer>
  );
};

export default UserListError;
