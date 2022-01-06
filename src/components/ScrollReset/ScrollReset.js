import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';

const ScrollReset = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(clearFormErrors());
  }, [location, dispatch]);

  return <>{children}</>;
};

export default ScrollReset;
