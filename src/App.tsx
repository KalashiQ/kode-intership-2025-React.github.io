import React from 'react';
import Search from './pages/Search';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }
`;

const AppWrapper = styled.div`
  background-color: #FFFFFF;
  min-height: 100vh;
  width: 100%;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Search />
      </AppWrapper>
    </>
  );
};

export default App;
