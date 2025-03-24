import { HashRouter, Routes, Route } from 'react-router-dom';
import Search from './features/search/pages/SearchPage';
import styled, { createGlobalStyle } from 'styled-components';
import UserDetails from './features/search/pages/UserDetails';
import { LanguageProvider } from './features/search/context/LanguageProvider';

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

const App = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <GlobalStyle />
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route 
              path="/user/:id" 
              element={<UserDetails />} 
            />
          </Routes>
        </AppWrapper>
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
