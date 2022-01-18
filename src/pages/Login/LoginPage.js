import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { login, setNotVerifiedEmail } from '../../redux/slices/auth/authSlice';

import Background from '../../components/AuthBackground/AuthBackground';
import { JInputField, JPasswordField } from '../../components/JInputField';
import Loader from '../../components/Loader';
import { FaArrowLeft } from 'react-icons/fa';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const location = useLocation();

  const navigate = useNavigate();

  const errors = useSelector((store) => store.errors.formErrors);

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/dashboard';

  if (errors['notVerified']) {
    dispatch(clearFormErrors());
    navigate('/notverified');
  }
  
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

    dispatch(setNotVerifiedEmail(values.email));
    dispatch(
      login({
        email: values.email,
        password: values.password,
      })
    );
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
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
                color: 'primary.main',
              }}>
              <FaArrowLeft style={{ color: 'inherit' }} />
              <Typography sx={{ marginLeft: 1, color: 'inherit' }}>
                Back to Home
              </Typography>
            </Link>

            <Typography
              variant='h3'
              sx={{
                marginBottom: 4,
                fontWeight: 'bold',
              }}>
              Login
            </Typography>

            <form autoComplete='on'>
              <FormGroup>
                <JInputField
                  topLabel='Email'
                  placeholder='Enter your email'
                  value={values.email}
                  handleChange={handleChange('email')}
                  errors={errors['email']}
                  disabled={loading}
                />

                <JPasswordField
                  topLabel='Password'
                  placeholder='Enter your password'
                  value={values.password}
                  handleChange={handleChange('password')}
                  errors={errors['password']}
                  handleClickShowPassword={handleClickShowPassword}
                  showPassword={values.showPassword}
                  disabled={loading}
                />

                <FormControl
                  sx={{
                    marginBottom: 2,
                  }}>
                  <FormControlLabel
                    control={<Checkbox disabled={loading} />}
                    label='Remember me'
                  />
                </FormControl>

                <FormControl
                  sx={{
                    color: 'text.primary',
                    marginBottom: 1,
                  }}>
                  <Button
                    type='submit'
                    disabled={loading}
                    variant='contained'
                    sx={{
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none',
                      },
                    }}
                    onClick={handleSubmit}>
                    {loading ? <Loader /> : 'Login'}
                  </Button>
                </FormControl>

                <FormControl
                  sx={{
                    textAlign: 'center',
                  }}>
                  <Link
                    component={RouterLink}
                    to='/forgotpassword'
                    underline='hover'
                    color='primary'>
                    Forgot Password
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
            </form>
          </Box>
        </Grid>
        <Grid item xs={2} sm={2} lg={3} xl={4} />
      </Grid>
      <Background />
    </Grid>
  );
};

export default LoginPage;
