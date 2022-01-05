import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  Button,
  Link
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';

import Background from '../../components/AuthBackground/AuthBackground';
import { JInputField } from '../../components/JInputField';
import Loader from '../../components/Loader';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
  });
  const location = useLocation();

  const navigate = useNavigate();

  const errors = useSelector((store) => store.errors.formErrors);

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [loggedIn, navigate, from]);

  const handleChange = (prop) => (event) => {
    if (Object.entries(errors).length !== 0) {
      dispatch(clearFormErrors());
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  
  return (
    <Grid container sx={{ backgroundColor: 'white' }}>
      <Grid item container xs={12} sm={8} lg={6}>
        <Grid item xs={2} sm={2} lg={3} xl={4} />
        <Grid item xs={8} sm={8} lg={6} xl={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Link
              underline='hover'
              component={RouterLink}
              variant='body2'
              to='/'
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <FaArrowLeft />
              <Typography sx={{ marginLeft: 1 }}>Back to Home</Typography>
            </Link>

            <Typography
              variant='h5'
              sx={{
                marginBottom: 4,
                fontWeight: 'bold',
              }}>
              Forgot Password
            </Typography>

            <FormGroup>
              <JInputField
                topLabel='Your Registered Email'
                placeholder='Enter your email'
                value={values.email}
                handleChange={handleChange('email')}
                errors={errors['email']}
                disabled={loading}
              />

              <FormControl
                sx={{
                  color: 'text.primary',
                  mb: 2,
                  mt : 3
                }}>
                <Button
                  disabled={loading}
                  variant='contained'
                  sx={{
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none',
                    },
                  }}
                  onClick={handleSubmit}>
                  {loading ? <Loader /> : 'Submit'}
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
                  Log in here
                </Link>
              </FormControl>

              <FormControl
                sx={{
                  textAlign: 'center',
                }}>
                <Link
                  component={RouterLink}
                  to='/signup'
                  underline='hover'
                  color='primary'>
                  New here? Sign up
                </Link>
              </FormControl>
            </FormGroup>
          </Box>
        </Grid>
        <Grid item xs={2} sm={2} lg={3} xl={4} />
      </Grid>
      <Background />
    </Grid>
  );
};

export default ForgotPassword;
