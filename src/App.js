import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';
import globalStyles from './styles/global';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import SplashScreen from './components/SplashScreen';
import DashboardPage from './pages/Dashboard';
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
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          {/* <Route path='/404' element={<NotFoundPage />} /> */}
          {/* Testing */}
          <Route path='/splash' element={<SplashScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
