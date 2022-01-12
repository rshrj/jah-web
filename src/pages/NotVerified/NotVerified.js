import { Grid, Typography, FormControl, Link } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import Background from '../../components/AuthBackground/AuthBackground';

const NotVerified = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [loggedIn, navigate, from]);

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
