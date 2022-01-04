import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, FormGroup, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { JInputField } from '../../components/JInputField';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { submitTestimonial } from '../../redux/slices/testimonials/testimonialsSlice';
import illustration from '../../assets/vectors/submit-testimonial.svg';
import Footer from '../../components/Footer';
import { useTheme } from '@emotion/react';

const SubmitTestimonial = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    company: '',
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
      submitTestimonial({
        name: values.name,
        company: values.company,
        message: values.message
      })
    );
  };

  const errors = useSelector((state) => state.errors.formErrors);
  const loading = useSelector((state) => state.callback.loading === 'loading');

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
                  value={values.company}
                  handleChange={handleChange('company')}
                  errors={errors['company']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Testomonial'
                  placeholder='Enter your testimonial'
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
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}
                onClick={handleSubmit}>
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
