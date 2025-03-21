import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  line-height: 28px;
  margin: 20px 0 20px 0;
  color: #050510;
  font-weight: 700;
`;

const SearchHeader: React.FC = () => {
  return <Title>Поиск</Title>;
};

export default SearchHeader; 