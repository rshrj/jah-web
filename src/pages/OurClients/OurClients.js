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
import { Box, createTheme, textAlign, ThemeProvider } from '@mui/system';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { submitCallBackRequest } from '../../redux/slices/callback/callbackSlice';

import { JInputField } from '../../components/JInputField';
import Footer from '../../components/Footer';

const importAll = (require) =>
  require.keys().reduce((acc, next) => {
    acc[next.replace('./', '')] = require(next);
    return acc;
  }, {});

const builderImages = importAll(
  require.context(
    '../../assets/images/ourclients/builders',
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const bankerImages = importAll(
  require.context(
    '../../assets/images/ourclients/bankers',
    false,
    /\.(png|jpe?g|svg)$/
  )
);

const OurClients = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    phone: '',
    message: 'Please call me back'
  });
  console.log(builderImages);

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
    <Box sx={{ widht: '100%', height: '100%', background: 'white' }}>
      <Container maxWidth='lg'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            Our Clients
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            align='center'
            sx={{ px: { xs: 0, sm: 15 } }}>
            Jai Ambe Advisory is proud to associate with the trend setters of
            the real estate industry. From leading developers of the country to
            dominant forces in micro-markets, from luxury brands to large-scale
            affordable housing and financial industries, our clients are the
            cream of the industry and are growing consistently. Our success is
            the testament to our exponential growth.
          </Typography>
        </Box>

        <Grid container sx={{ py: 5 }}>
          {Object.keys(builderImages).map((image, index) => (
            <Grid
              item
              xs={6}
              sm={3}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 3
              }}>
              <img
                src={builderImages[image]}
                alt='Jai Ambe Client'
                style={{ width: '150px', height: 'auto' }}
              />
            </Grid>
          ))}
          {Object.keys(bankerImages).map((image, index) => (
            <Grid
              item
              xs={6}
              sm={3}
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                my: 3
              }}>
              <img
                src={bankerImages[image]}
                alt='Jai Ambe Client'
                style={{ width: '150px', height: 'auto' }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default OurClients;
