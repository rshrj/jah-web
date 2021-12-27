import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import theme from './styles/theme';
import globalStyles from './styles/global';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import SplashScreen from './components/SplashScreen';
import DashboardPage from './pages/Dashboard';
// import NotFoundPage from './pages/NotFoundPage';

import { loadUserByToken } from './redux/slices/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token');
    dispatch(loadUserByToken(token));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          {/* <Route path='/404' element={<NotFoundPage />} /> */}
          {/* Testing */}
          <Route path='/splash' element={<SplashScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
