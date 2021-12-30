import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SplashScreen from '../SplashScreen';

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  let loading = useSelector((state) => state.auth.loading);

  if (loading === 'loading' || loading === 'init') {
    return <SplashScreen />;
  }

  if (loading === 'idle') {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
