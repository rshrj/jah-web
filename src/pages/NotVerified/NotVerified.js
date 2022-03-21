import { Grid, Typography, FormControl, Link, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { resendToken } from '../../redux/slices/auth/authSlice';
import Background from '../../components/AuthBackground/AuthBackground';

const NotVerified = () => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const time = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);
    return () => clearInterval(time);
  }, [timer]);

  const location = useLocation();

  const navigate = useNavigate();

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const email = useSelector((store) => store.auth.notVerifiedEmail);

  const from = location.state?.from?.pathname || '/dashboard';

  const dispatch = useDispatch();

  useEffect(() => {
    if(email === ''){
      navigate('/login', { replace: true });
    }

    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [loggedIn, navigate, from]);

  const resendEmail = () =>{
    dispatch(resendToken({ setTimer, email: email }));
  }

  return (
    <Grid container sx={{ backgroundColor: 'white' }}>
      <Grid item container xs={12} sm={8} lg={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}>
          <Typography
            variant='h6'
            sx={{
              color: 'red',
              marginBottom: 4,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Please check your email and verify your account.
          </Typography>

          <FormControl
            sx={{
              textAlign: 'center',
              mb: 2,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Button
              disabled={loading || timer !== 0}
              variant='contained'
              sx={{
                width: '150px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}
              onClick={resendEmail}
              color='primary'>
              {timer !== 0 ? `Resend in ${timer}` : 'Resend email'}
            </Button>
          </FormControl>
          <FormControl
            sx={{
              textAlign: 'center',
            }}>
            <Link
              component={RouterLink}
              to='/login'
              underline='hover'
              color='primary'>
              Already Verified ? Login here
            </Link>
          </FormControl>
        </Box>
      </Grid>
      <Background />
    </Grid>
  );
};

export default NotVerified;
