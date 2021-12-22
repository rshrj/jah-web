import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Link,
  TextField,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import validator from 'validator';

import Background from './Background';

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              <FormControl
                sx={{
                  marginBottom: 2
                }}>
                <FormLabel
                  sx={{
                    color: 'text.primary',
                    marginBottom: 1
                  }}>
                  Email
                </FormLabel>
                <TextField
                  autoComplete='false'
                  id='my-input'
                  error={errors.email !== ''}
                  aria-describedby='my-helper-text'
                  onChange={handleChange('email')}
                  label='Enter your email'
                />
                {errors.email !== '' && (
                  <FormHelperText error={errors.email !== ''}>
                    {errors.email !== ''
                      ? errors.email
                      : 'Must be 8 characters or more'}
                  </FormHelperText>
                )}
              </FormControl>

              <FormLabel
                sx={{
                  color: 'text.primary',
                  marginBottom: 1
                }}>
                Password
              </FormLabel>
              <FormControl
                sx={{
                  marginBottom: 2
                }}>
                <InputLabel htmlFor='login-password'>
                  Enter your password
                </InputLabel>
                <OutlinedInput
                  error={errors.password !== ''}
                  id='login-password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  aria-describedby='Login form password'
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'>
                        {values.showPassword ? <FaEyeSlash /> : <FaEye />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Enter your password'
                />
                <FormHelperText error={errors.password !== ''}>
                  {errors.password !== ''
                    ? errors.password
                    : 'Must be 8 characters or more'}
                </FormHelperText>
              </FormControl>

              <FormControl
                sx={{
                  marginBottom: 2
                }}>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
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
                  Login
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
                <Link href='#' underline='hover' color='primary'>
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
