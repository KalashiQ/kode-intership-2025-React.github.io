import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import styled, { createGlobalStyle } from 'styled-components';
import UserDetails from './pages/Search/UserDetails';
import { LanguageProvider } from './context/LanguageProvider';

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
      <BrowserRouter>
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
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
