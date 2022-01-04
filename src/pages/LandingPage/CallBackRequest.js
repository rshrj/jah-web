import {
  Box,
  Button,
  Container,
  FormGroup,
  Grid,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { submitCallBackRequest } from '../../redux/slices/callback/callbackSlice';
import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';

import { JInputField } from '../../components/JInputField';

const CallBackRequest = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleChange = (prop) => (event) => {
    if (Object.entries(errors).length !== 0) {
      dispatch(clearFormErrors());
    }

    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      submitCallBackRequest({
        name: values.name,
        phone: values.phone,
        message: values.message
      })
    );
  };

  const errors = useSelector((state) => state.errors.formErrors);
  const loading = useSelector((state) => state.callback.loading === 'loading');

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'common.white'
      }}>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            paddingTop: 5,
            px: { xs: 0, sm: 15 }
          }}>
          <Box sx={{}}>
            <Typography
              textAlign='center'
              variant={isPhone ? 'h4' : 'h3'}
              color='primary.main'
              sx={{ marginBottom: 1 }}>
              Request a Call Back
            </Typography>
            <Typography
              textAlign='center'
              variant={isPhone ? 'subtitle1' : 'h6'}
              color='text.secondary'>
              Enter your details and query here. We will get back to you soon.
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ marginTop: 3, maxWidth: 600 }}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Name'
                  placeholder='Enter your name'
                  spacing={0}
                  value={values.name}
                  handleChange={handleChange('name')}
                  errors={errors['name']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Phone'
                  placeholder='Enter your phone number'
                  spacing={0}
                  value={values.phone}
                  handleChange={handleChange('phone')}
                  errors={errors['phone']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Message'
                  placeholder='"Please call me back"'
                  spacing={0}
                  value={values.message}
                  handleChange={handleChange('message')}
                  errors={errors['message']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} textAlign='center'>
              <Button
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}
                disabled={loading}
                onClick={handleSubmit}>
                Call Me
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default CallBackRequest;
