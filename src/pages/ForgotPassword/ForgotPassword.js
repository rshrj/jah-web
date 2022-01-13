import {
  FormGroup,
  Grid,
  Typography,
  FormControl,
  Button,
  Link,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { HashLoader } from 'react-spinners';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import {
  forgotPassword,
  verifyResetToken,
  resetPassword,
} from '../../redux/slices/auth/authSlice';

import Background from '../../components/AuthBackground/AuthBackground';
import { JInputField, JPasswordField } from '../../components/JInputField';
import Loader from '../../components/Loader';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPassword = () => {
  const theme = useTheme();

  const [values, setValues] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const location = useLocation();

  const navigate = useNavigate();

  const errors = useSelector((store) => store.errors.formErrors);

  const { requestSent, isValidToken, resetDone } = useSelector(
    (store) => store.auth.forgotPassword
  );

  const loading = useSelector((store) => store.auth.loading === 'loading');

  const loggedIn = useSelector((store) => store.auth.loading === 'loggedIn');

  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/dashboard';

  const [searchParams] = useSearchParams();

  const verificationToken = searchParams.get('token');

  useEffect(() => {
    if (verificationToken) {
      dispatch(verifyResetToken({ token: verificationToken }));
    }
    if (loggedIn) {
      navigate(from, { replace: true });
    }
  }, [dispatch, verificationToken, loggedIn, navigate, from]);

  const handleChange = (prop) => (event) => {
    if (Object.entries(errors).length !== 0) {
      dispatch(clearFormErrors());
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPassword({ email: values.email }));
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    dispatch(
      resetPassword({
        token: verificationToken,
        password: values.password,
        password2: values.password2,
      })
    );
  };

  const handleClickShowPassword = (prop) => () => {
    setValues({
      ...values,
      [prop]: !values[prop],
    });
  };

  let content;
  if (loading) {
    content = (
      <Box
        component='div'
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HashLoader
          color={theme.palette.primary.main}
          style={{ display: 'block', margin: '100px' }}
          size={150}
        />
      </Box>
    );
  } else if (!verificationToken) {
    let data;
    if (requestSent) {
      data = (
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#28a745',
          }}>
          Please check your email.
        </Typography>
      );
    } else {
      data = (
        <>
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
              mt: 3,
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
        </>
      );
    }

    content = (
      <>
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
          {data}
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
      </>
    );
  } else if (!isValidToken) {
    content = (
      <Box
        component='div'
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#dc3545',
          }}>
          Invalid Link.
        </Typography>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#dc3545',
          }}>
          Please close the window.
        </Typography>
      </Box>
    );
  } else if (!resetDone) {
    content = (
      <>
        <Typography
          variant='h5'
          sx={{
            marginBottom: 4,
            fontWeight: 'bold',
          }}>
          Reset Password
        </Typography>
        <FormGroup>
          <JPasswordField
            topLabel='New Password'
            placeholder='Enter your password'
            value={values.password}
            handleChange={handleChange('password')}
            errors={errors.password}
            handleClickShowPassword={handleClickShowPassword('showPassword')}
            showPassword={values.showPassword}
            disabled={loading}
          />

          <JPasswordField
            topLabel='Confirm New Password'
            placeholder='Confirm your password'
            value={values.password2}
            handleChange={handleChange('password2')}
            errors={errors.password2}
            handleClickShowPassword={handleClickShowPassword('showPassword2')}
            showPassword={values.showPassword2}
            disabled={loading}
            defaultHelperText=''
          />

          <FormControl
            sx={{
              color: 'text.primary',
              mb: 2,
              mt: 3,
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
              onClick={handleResetSubmit}>
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </FormControl>
        </FormGroup>
      </>
    );
  } else {
    content = (
      <>
        <Typography
          variant='body1'
          sx={{
            mb: 4,
            mt: 2,
            fontWeight: 'bold',
            color: '#28a745',
          }}>
          Your password has been changed successfully.
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
            Click here to Login
          </Link>
        </FormControl>
      </>
    );
  }
  return (
    <>
      <Grid container sx={{ backgroundColor: 'white' }}>
        <Grid item container xs={12} sm={8} lg={6} justifyContent='center'>
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
              }}>
              {content}
            </Box>
          </Grid>
        </Grid>
        <Background />
      </Grid>
    </>
  );
};

export default ForgotPassword;
