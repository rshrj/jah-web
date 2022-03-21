import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Container,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  TextareaAutosize,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Box } from '@mui/system';
import { JInputField } from '../../components/JInputField';
import { useTheme, styled } from '@mui/material/styles';

import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';
import { submitTestimonial } from '../../redux/slices/testimonials/testimonialsSlice';
import illustration from '../../assets/vectors/testimonial-illustration.svg';
import Footer from '../../components/Footer';
import Testimonials from '../LandingPage/Testimonials';

const StyledTextareaAutosize = styled(TextareaAutosize)(({ theme }) => ({
  fontFamily: 'inherit',
  borderColor: theme.palette.grey[400],
  borderRadius: 5,
  padding: theme.spacing(1),
  backgroundColor: 'inherit',
  '&:hover': {
    borderColor: theme.palette.grey[600]
  },
  '&:focus': {
    borderColor: theme.palette.primary.main
  },
  '&:focus-visible': {
    borderColor: theme.palette.primary.main
  }
}));

const SubmitTestimonial = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    name: '',
    company: '',
    message: '',
    phone: ''
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
        message: values.message,
        phone: values.phone
      })
    );
  };

  const errors = useSelector((state) => state.errors.formErrors);
  const loading = useSelector(
    (state) => state.testimonials.loading === 'loading'
  );

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
          <Grid
            container
            spacing={2}
            sx={{ marginTop: 3, maxWidth: 600 }}
            component='form'
            autoComplete='off'>
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
                  topLabel='Phone number'
                  placeholder='Enter your phone number'
                  helperText='We will not share your phone number with anyone'
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
                <FormLabel
                  sx={{
                    color: 'text.primary',
                    marginBottom: 1
                  }}>
                  <Typography
                    variant='body1'
                    color='text.primary'
                    sx={{
                      display: 'inline-block',
                      marginRight: 1
                    }}>
                    Testimonial
                  </Typography>
                </FormLabel>
                <StyledTextareaAutosize
                  aria-label='Testimonial message'
                  minRows={4}
                  value={values.message}
                  onChange={handleChange('message')}
                  placeholder='Enter your testimonial'
                />
                {errors['message'] !== undefined && (
                  <FormHelperText error>{errors['message']}</FormHelperText>
                )}
                <Typography
                  color={
                    values.message.length <= 140 ? 'text.secondary' : 'error'
                  }
                  fontWeight={values.message.length <= 140 ? 'normal' : 'bold'}
                  sx={{ marginTop: 1 }}>
                  {values.message.length} / 140
                </Typography>
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12} textAlign='left'>
              <Button
                type='submit'
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}
                onClick={handleSubmit}
                disabled={loading || values.message.length > 140}>
                Submit
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <Box
              sx={{
                width: isPhone ? 330 : 500,
                height: isPhone ? 330 : 500,
                backgroundImage: `url(${illustration})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}></Box>
          </Grid>
        </Grid>

        <Testimonials submit={false} />

        <Box sx={{ height: 100 }}> </Box>
      </Container>
      <Footer />
    </>
  );
};

export default SubmitTestimonial;
