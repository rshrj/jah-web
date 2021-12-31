import { CssBaseline, Stack, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Global } from '@emotion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import theme from './styles/theme';
import globalStyles from './styles/global';

import { loadUserByToken } from './redux/slices/auth/authSlice';

import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import SplashScreen from './components/SplashScreen';
import DashboardPage from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import JSnackbar from './components/JSnackbar';
import MyAccount from './pages/MyAccount';
import NewListingPage from './pages/NewListingPage';
import LandingPage from './pages/LandingPage';
import BuyHomes from './pages/BuyHomes/BuyHomes';
import NotFoundPage from './pages/NotFoundPage';
import ListingsPage from './pages/ListingsPage/ListingsPage';
import Users from './pages/Users/Users';
import Testimonials from './pages/Testimonials/Testimonials';
import CallbackRequests from './pages/CallbackRequests/CallbackRequests';

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
        <Stack spacing={2} sx={{ width: '100%' }}>
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
          <Route path='/'>
            <Route index element={<LandingPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='forbuyers' element={<BuyHomes />} />
            <Route
              path='dashboard'
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }>
              <Route path='listings' element={<ListingsPage />} />
              <Route path='users' element={<Users />} />
              <Route path='myaccount' element={<MyAccount />} />
              <Route path='newlisting' element={<NewListingPage />} />
              <Route path='testimonials' element={<Testimonials />} />
              <Route path='callbackrequests' element={<CallbackRequests />} />
            </Route>
            {/* Testing */}
            <Route path='splash' element={<SplashScreen />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
