import { Button, Container, FormGroup, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { JInputField } from '../../components/JInputField';

import illustration from '../../assets/vectors/submit-testimonial.svg';
import Footer from '../../components/Footer';
import { useTheme } from '@emotion/react';

const SubmitTestimonial = () => {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            Submit Testimonial
          </Typography>
        </Box>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Grid container spacing={2} sx={{ marginTop: 3, maxWidth: 600 }}>
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
                  topLabel={
                    <Typography>
                      Company Name{' '}
                      <span
                        style={{
                          color: theme.palette.text.secondary,
                          fontSize: 13,
                          marginLeft: 1
                        }}>
                        (Optional)
                      </span>
                    </Typography>
                  }
                  placeholder='Enter your company name'
                  spacing={0}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Testomonial'
                  placeholder='Enter your testimonial'
                  spacing={0}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} textAlign='left'>
              <Button
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}>
                Submit
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Box
              sx={{
                width: 500,
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

export default SubmitTestimonial;
