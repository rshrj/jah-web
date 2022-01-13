import { CssBaseline, Stack } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import theme from './styles/theme';

import { loadUserByToken } from './redux/slices/auth/authSlice';

import SplashScreen from './components/SplashScreen';
import PrivateRoute from './components/PrivateRoute';
import JSnackbar from './components/JSnackbar';
import ScrollReset from './components/ScrollReset';

import VerifyToken from './pages/VerifyToken';
import NotVerified from './pages/NotVerified';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import DashboardPage from './pages/Dashboard';
import PublicPage from './pages/PublicPage';
import MyAccount from './pages/MyAccount';
import NewListingPage from './pages/NewListingPage';
import ListingView from './pages/ListingView';
import LandingPage from './pages/LandingPage';
import GalleryView from './pages/GalleryView';
import NotFoundPage from './pages/NotFoundPage';
import ListingsPage from './pages/ListingsPage';
import Users from './pages/Users';
import CallbackRequests from './pages/CallbackRequests';
import TermsAndConditions from './pages/TermsAndConditions';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SubmitTestimonial from './pages/SubmitTestimonial';
import HomeAd from './pages/HomeAd';
import EditListing from './pages/EditListing';
import Testimonials from './pages/Testimonials'
import ForgotPassword from './pages/ForgotPassword';

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
        <ScrollReset>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/notverified' element={<NotVerified />} />
            <Route path='/verifyToken/:token' element={<VerifyToken />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/' element={<PublicPage />}>
              <Route index element={<LandingPage />} />
              <Route path='home' element={<LandingPage />} />
              <Route path='listing/:listingId' element={<ListingView />} />
              <Route path='forbuyers' element={<GalleryView mode='buy' />} />
              <Route path='fortenants' element={<GalleryView mode='rent' />} />
              <Route path='contact' element={<ContactPage />} />
              <Route path='tnc' element={<TermsAndConditions />} />
              <Route path='submittestimonial' element={<SubmitTestimonial />} />
              <Route path='privacy' element={<PrivacyPolicy />} />
              <Route path='about' element={<AboutPage />} />
              <Route
                path='dashboard'
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }>
                <Route index element={<ListingsPage />} />
                <Route path='listings' element={<ListingsPage />} />
                <Route path='edit/:id' element={<EditListing />} />
                <Route path='users' element={<Users />} />
                <Route path='myaccount' element={<MyAccount />} />
                <Route path='homead' element={<HomeAd />} />
                <Route path='newlisting' element={<NewListingPage />} />
                <Route path='testimonials' element={<Testimonials />} />
                <Route path='callbackrequests' element={<CallbackRequests />} />
              </Route>
            </Route>
            {/* Testing */}
            <Route path='/splash' element={<SplashScreen />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </ScrollReset>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
