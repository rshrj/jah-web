import { Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { verifyToken } from '../../redux/slices/auth/authSlice';

import Background from '../../components/AuthBackground/AuthBackground';

const VerifyToken = () => {
  const theme = useTheme();
  const { token } = useParams();
  const [check, setCheck] = useState(false);
  const [verified, setVerified] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    dispatch(verifyToken({ setCheck, setVerified, token }));
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [dispatch, loggedIn, navigate, from, token]);

  const goToLogin = () => {
    navigate('/login');
  };

  let data = <></>;

  if (loading || check) {
    data = (
    
      <HashLoader
        color={theme.palette.primary.main}
        style={{ display: 'block', margin: '100px' }}
        size={150}
      />
     
    );
  } else if (verified) {
    data = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#28a745',
            width: '100%',
          }}>
          Your email has been verified successfully.
        </Typography>

        <Button
          disabled={loading}
          variant='contained'
          sx={{
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          }}
          onClick={goToLogin}>
          Go to Login
        </Button>
      </Box>
    );
  } else {
    data = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#D93025',
            width: '100%',
          }}>
          Invalid verification link.
        </Typography>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#D93025',
            width: '100%',
          }}>
          Please close the current tab.
        </Typography>
      </Box>
    );
  }
  return (
    <>
      <Grid container sx={{ backgroundColor: 'white' }}>
        <Grid item container xs={12} sm={8} lg={6}>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {data}
          </Box>
        </Grid>
        <Background />
      </Grid>
    </>
  );
};

export default VerifyToken;
