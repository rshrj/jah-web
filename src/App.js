import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import globalStyles from './styles/global';

import LoginPage from './pages/LoginPage';
// import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path='/login' element={<LoginPage />} />
          {/* <Route path='/404' element={<NotFoundPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
