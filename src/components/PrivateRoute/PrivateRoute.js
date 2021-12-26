import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  let location = useLocation();
  let loggedIn = useSelector((state) => state.auth.loading === 'loggedIn');

  if (!loggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
