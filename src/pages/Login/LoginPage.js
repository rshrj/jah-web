import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Link
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import validator from 'validator';

import Background from '../../components/AuthBackground/AuthBackground';
import { JInputField, JPasswordField } from '../../components/JInputField';
import Loader from '../../components/Loader';

const LoginPage = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    showPassword: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (prop) => (event) => {
    setErrors({
      ...errors,
      email: '',
      password: ''
    });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator.isEmpty(values.email) || !validator.isEmail(values.email)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email'
      });

      return;
    }

    setErrors({
      ...errors,
      email: ''
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert('Logged in');
    }, 4000);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  return (
    <Grid container>
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
            <Typography
              variant='h3'
              bold
              component='h2'
              sx={{
                marginBottom: 4,
                fontWeight: 'bold'
              }}>
              Login
            </Typography>

            <FormGroup>
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
                handleClickShowPassword={handleClickShowPassword}
                showPassword={values.showPassword}
                disabled={loading}
              />

              <FormControl
                sx={{
                  marginBottom: 2
                }}>
                <FormControlLabel
                  control={<Checkbox disabled={loading} />}
                  label='Remember me'
                />
              </FormControl>

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
                  {loading ? <Loader /> : 'Login'}
                </Button>
              </FormControl>

              <FormControl
                sx={{
                  textAlign: 'center'
                }}>
                <Link href='#' underline='hover' color='primary'>
                  Forgot Password
                </Link>
              </FormControl>

              <FormControl
                sx={{
                  textAlign: 'center'
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

export default LoginPage;
