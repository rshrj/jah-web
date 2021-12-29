import {
  Button,
  CssBaseline,
  IconButton,
  LinearProgress,
  Snackbar,
  Stack
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import theme from './styles/theme';
import globalStyles from './styles/global';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import SplashScreen from './components/SplashScreen';
import DashboardPage from './pages/Dashboard';
// import NotFoundPage from './pages/NotFoundPage';

import { loadUserByToken } from './redux/slices/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import { clearToast } from './redux/slices/errors/errorsSlice';
import JSnackbar from './components/JSnackbar/JSnackbar';
import { Box } from '@mui/system';
import MyAccount from './pages/MyAccount/MyAccount';
import BuyHomes from './pages/BuyHomes';
import LandingPage from "./pages/LandingPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token');
    dispatch(loadUserByToken(token));
  }, [dispatch]);

  const toasts = useSelector((state) => state.errors.toastErrors);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      {/* Toasts */}
      {toasts.ids.length !== 0 && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          {toasts.ids.map((toastId) => (
            <JSnackbar
              key={toastId}
              toastId={toastId}
              toast={toasts.errors[toastId]}
            />
          ))}
        </Stack>
      )}

      <BrowserRouter>
        <Routes>
          <Route path='/forbuyers' element={<BuyHomes />} />
          <Route path='/home' element={<LandingPage />} />
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
            }>
            <Route path='myaccount' element={<MyAccount />} />
          </Route>
          {/* <Route path='/404' element={<NotFoundPage />} /> */}
          {/* Testing */}
          <Route path='/splash' element={<SplashScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
