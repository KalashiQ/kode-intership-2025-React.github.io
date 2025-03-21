import React from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
`;

const ErrorMessage = styled.p`
  font-size: 17px;
  line-height: 22px;
  margin: 8px 0 12px;
`;

const RetryButton = styled.button`
  background: transparent;
  border: none;
  color: #6534ff;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 16px;

  &:hover {
    opacity: 0.8;
  }
`;

interface ErrorScreenProps {
  message: string;
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, onRetry }) => {
  return (
    <ErrorContainer>
      <ErrorMessage>{message}</ErrorMessage>
      <RetryButton onClick={onRetry}>Попробовать снова</RetryButton>
    </ErrorContainer>
  );
};

export default ErrorScreen;
