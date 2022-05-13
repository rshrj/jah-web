import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  Button,
  Container,
  Divider,
  FormGroup,
  Grid,
  Link,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Box, textAlign } from '@mui/system';

import illustration from '../../assets/vectors/illustration.svg';
import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { submitCallBackRequest } from '../../redux/slices/callback/callbackSlice';

import aboutPic from '../../assets/images/about-pic.jpeg';

import { JInputField } from '../../components/JInputField';
import Footer from '../../components/Footer';

const ContactPage = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    phone: '',
    message: 'Please call me back'
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
    <>
      <Container maxWidth='lg'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            Let’s Talk
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            align='center'
            sx={{ px: { xs: 0, sm: 15 } }}>
            If you need more details about any property, want to buy or rent
            with us, or just want to meet up with us for coffee, fill the form
            and we will call you in 4 working hours.
          </Typography>
        </Box>

        <Box
          sx={{
            pt: 4,
            display: 'flex',
            flexDirection: isPhone ? 'column' : 'row',
            alignItems: isPhone ? 'flex-start' : 'center',
            justifyContent: 'center'
          }}>
          <img
            src={aboutPic}
            alt={'Jai Ambe Advisory'}
            style={{
              width: isPhone ? '100%' : '550px',
              height: 'auto'
            }}
          />
          <Box sx={{ mx: { xs: 0, sm: 5 } }}>
            <Typography variant='h5'>Jai Ambe Advisory Pvt Ltd</Typography>
            <Divider sx={{ mt: 1, mb: 2 }} />
            <Typography fontWeight='bold'>Address</Typography>
            <Typography color='text.secondary'>
              412, GoldCrest Business Park LBS Marg
            </Typography>
            <Typography color='text.secondary'>
              Ghatkopar, West Mumbai 400086
            </Typography>

            <Typography fontWeight='bold' sx={{ mt: 2 }}>
              Contact details
            </Typography>
            <Typography color='text.secondary'>Vijay Kumar</Typography>

            <Typography
              color='text.secondary'
              component={Link}
              href='tel:+919820274540'
              display='block'>
              9820274540
            </Typography>

            <Typography
              color='text.secondary'
              component={Link}
              href='mailto:vijay@jaiambehomes.com'
              display='block'>
              vijay@jaiambehomes.com
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 3, maxWidth: 600 }}
            component='form'
            autoComplete={false}>
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
                  placeholder='Enter your message'
                  spacing={0}
                  value={values.message}
                  handleChange={handleChange('message')}
                  errors={errors['message']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} textAlign='left'>
              <Button
                type='submit'
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5, width: '100%' }}
                onClick={handleSubmit}>
                Call Me
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Box
              sx={{
                width: isPhone ? 400 : 500,
                height: isPhone ? 400 : 500,
                backgroundImage: `url(${illustration})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                textAlign: 'center'
              }}></Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
