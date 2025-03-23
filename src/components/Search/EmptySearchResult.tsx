import React from "react";
import styled from "styled-components";
import loopIcon from "../../assets/loop.svg";
import { useLanguage } from '../../context/LanguageContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
`;

const Image = styled.img`
  width: 56px;
  height: 56px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-family: Inter;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  text-align: center;
  color: #050510;
  margin: 8px 0;
`;

const Subtitle = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #97979B;
  margin: 0;
`;

const EmptySearchResult: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Container>
      <Image src={loopIcon} alt={t('search.empty.title')} />
      <Title>{t('search.empty.title')}</Title>
      <Subtitle>{t('search.empty.subtitle')}</Subtitle>
    </Container>
  );
};

export default EmptySearchResult; 