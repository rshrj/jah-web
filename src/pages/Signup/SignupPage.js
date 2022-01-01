import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  Button,
  Link
} from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import validator from 'validator';

import { signup } from '../../redux/slices/auth/authSlice';

import Background from '../../components/AuthBackground/AuthBackground';
import { JInputField, JPasswordField } from '../../components/JInputField';
import Loader from '../../components/Loader';
import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { FaArrowLeft } from 'react-icons/fa';

const SignupPage = () => {
  const navigate = useNavigate();

  const errors = useSelector((store) => store.errors.formErrors);

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard', { replace: true });
    }
  }, [loggedIn, navigate]);

  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    showPassword: false,
    password2: '',
    showPassword2: false
  });

  // const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    if (Object.entries(errors).length !== 0) {
      dispatch(clearFormErrors());
    }
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const [first, last] = values.name.split(' ');

    dispatch(
      signup({
        email: values.email,
        password: values.password,
        password2: values.password2,
        name: { first, last },
        phone: values.phone
      })
    );
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({
      ...values,
      [prop]: !values[prop]
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
              justifyContent: 'center'
            }}>
            <Link
              underline='hover'
              component={RouterLink}
              variant='body2'
              to='/'
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: 2
              }}>
              <FaArrowLeft />
              <Typography sx={{ marginLeft: 1 }}>Back to Home</Typography>
            </Link>

            <Typography
              variant='h3'
              component='h2'
              sx={{
                marginBottom: 4,
                fontWeight: 'bold'
              }}>
              Sign Up
            </Typography>

            <FormGroup>
              <JInputField
                topLabel='Name'
                placeholder='Enter your name'
                value={values.name}
                handleChange={handleChange('name')}
                errors={errors.name}
                disabled={loading}
              />

              <JInputField
                topLabel='Phone number'
                placeholder='Enter your phone number'
                value={values.phone}
                type='tel'
                handleChange={handleChange('phone')}
                errors={errors.phone}
                disabled={loading}
              />

              <JInputField
                topLabel='Email'
                placeholder='Enter your email'
                value={values.email}
                handleChange={handleChange('email')}
                errors={errors.email}
                disabled={loading}
              />

              <JPasswordField
                topLabel='Password'
                placeholder='Enter your password'
                value={values.password}
                handleChange={handleChange('password')}
                errors={errors.password}
                handleClickShowPassword={handleClickShowPassword(
                  'showPassword'
                )}
                showPassword={values.showPassword}
                disabled={loading}
              />

              <JPasswordField
                topLabel='Confirm password'
                placeholder='Confirm your password'
                value={values.password2}
                handleChange={handleChange('password2')}
                errors={errors.password2}
                handleClickShowPassword={handleClickShowPassword(
                  'showPassword2'
                )}
                showPassword={values.showPassword2}
                disabled={loading}
                defaultHelperText=''
              />

              <FormControl
                sx={{
                  color: 'text.primary',
                  marginBottom: 1
                }}>
                <Button
                  disabled={loading}
                  variant='contained'
                  sx={{
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: 'none'
                    }
                  }}
                  onClick={handleSubmit}>
                  {loading ? <Loader /> : 'Sign Up'}
                </Button>
              </FormControl>

              <FormControl
                sx={{
                  textAlign: 'center'
                }}>
                <Link
                  component={RouterLink}
                  to='/login'
                  underline='hover'
                  color='primary'>
                  Already have an account? Log in
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

export default SignupPage;
