import { Button, Container, FormGroup, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { JInputField } from '../../components/JInputField';

import illustration from '../../assets/vectors/illustration.svg';
import Footer from '../../components/Footer';

const ContactPage = () => {
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

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 5
          }}>
          <Grid
            item
            container
            xs={12}
            sm={5}
            spacing={2}
            sx={{ marginTop: 3, maxWidth: 600 }}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Name'
                  placeholder='Enter your name'
                  spacing={0}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Phone'
                  placeholder='Enter your phone number'
                  spacing={0}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Message'
                  placeholder='"Please call me back"'
                  spacing={0}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Button
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}>
                Call Me
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box
              sx={{
                width: '100%',
                height: 500,
                backgroundImage: `url(${illustration})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}></Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ContactPage;
