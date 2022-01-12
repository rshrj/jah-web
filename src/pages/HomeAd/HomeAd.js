import {
  Box,
  Button,
  Container,
  FormGroup,
  Grid,
  Typography,
  useMediaQuery,
  FormControl,
  FormLabel,
  lighten,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { submitHomeAdChange } from '../../redux/slices/settings/settingsSlice';
import { clearFormErrors } from '../../redux/slices/errors/errorsSlice';

import { JInputField } from '../../components/JInputField';
import UploadZone from '../../components/UploadZone';

const HomeAd = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: '',
    tagline: '',
    buttonTitle: '',
    buttonLink: '',
    adImage: undefined,
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
      submitHomeAdChange({
        setValues : setValues,
        title: values.title,
        tagline: values.tagline,
        image: values.adImage,
        buttonTitle: values.buttonTitle,
        buttonLink: values.buttonLink,
      })
    );
  };

  const handleFilesChange = (event, newFiles) => {
 
    
      setValues({
        ...values,
        adImage: newFiles,
      });
    
  };


  const errors = useSelector((state) => state.errors.formErrors);
  const loading = useSelector((state) => state.settings.loading === 'loading');

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        backgroundColor: 'common.white',
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
            px: { xs: 0, sm: 15 },
          }}>
          <Box sx={{}}>
            <Typography
              textAlign='center'
              variant={isPhone ? 'h4' : 'h3'}
              color='primary.main'
              sx={{ marginBottom: 1 }}>
              Home Ad
            </Typography>
            <Typography
              textAlign='center'
              variant={isPhone ? 'subtitle1' : 'h6'}
              color='text.secondary'>
              Enter the details below to update the ad on home page.
            </Typography>
          </Box>

          <Grid container spacing={2} sx={{ marginTop: 3, maxWidth: 600 }}>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Title'
                  placeholder='Enter the title'
                  spacing={0}
                  value={values.title}
                  handleChange={handleChange('title')}
                  errors={errors['title']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormGroup>
                <JInputField
                  topLabel='Tagline'
                  placeholder='Enter a tagline'
                  spacing={0}
                  value={values.tagline}
                  handleChange={handleChange('tagline')}
                  errors={errors['tagline']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
           
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Button text'
                  placeholder='Please enter the text to appear on the button'
                  spacing={0}
                  value={values.buttonTitle}
                  handleChange={handleChange('buttonTitle')}
                  errors={errors['buttonTitle']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormGroup>
                <JInputField
                  topLabel='Button link'
                  placeholder='Please enter the link that opens on button click'
                  spacing={0}
                  value={values.buttonLink}
                  handleChange={handleChange('buttonLink')}
                  errors={errors['buttonLink']}
                  disabled={loading}
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ marginBottom: 5, width:'100%' }}>
                <FormLabel
                  sx={{
                    color: 'text.primary',
                    marginBottom: 1,
                  }}>
                  <Typography
                    variant='body1'
                    // color='text.secondary'
                    sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                    HomeAd Poster
                    <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
                  </Typography>
                </FormLabel>
                  <UploadZone
                    file={values.adImage}
                    onFilesChange={handleFilesChange}
                    label1='Drag and drop or click to choose file'
                    accept='image/*'
                    multiple={false}
                  />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} textAlign='center'>
              <Button
                variant='contained'
                sx={{ marginTop: 2, marginBottom: 5 }}
                disabled={loading}
                onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAd;
