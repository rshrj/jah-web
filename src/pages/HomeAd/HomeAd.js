import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormGroup,
  Typography,
  FormControl,
  Button,
  Box,
  FormLabel,
  lighten,
} from '@mui/material';
import UploadZone from '../../components/UploadZone';
import { JInputField } from '../../components/JInputField';
import { FaArrowCircleRight } from 'react-icons/fa';
import Loader from '../../components/Loader';

const HomeAd = () => {
    const loading = useSelector(
      (state) => state.listings.loading === 'loading'
    );

  const [values, setValues] = useState({
    projectName: '',
    tagline: '',
    buttonLink: '',
    picture: [],
    featuredPicture:'',
  });



  const handleChange = (prop) => (event) => {
    //    if (Object.entries(errors).length !== 0) {
    //  dispatch(clearFormErrors());
    //    }
       setValues({ ...values, [prop]: event.target.value });
  };

  const handleFilesChange = (event, newFiles) => {
   
    setValues({
      ...values,
      picture: newFiles
    });
  };

  const handleSelectedFileChange = (event, file) => {
 
    setValues({
      ...values,
      featuredPicture: file
    });
  };

   const handleSubmit = (event) => {
     event.preventDefault();

    
   };

  return (
    <>
      <Box
        justifyContent='center'
        sx={{
          margin: 'auto',
          width: { sm: '100%', md: '50%', lg: '50%', xl: '40%' },
        }}>
        <Typography
          variant='h4'
          sx={{
            marginBottom: 4,
            fontWeight: 'bold',
            textAlign:'center'
          }}>
          Home Ad
        </Typography>

        <FormGroup>
          <JInputField
            topLabel={
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}>
                Project Name
                <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
              </Typography>
            }
            placeholder='Enter the project name'
            value={values.projectName}
            spacing={2}
            handleChange={handleChange('projectName')}
            disabled={false}
          />
          <JInputField
            topLabel={
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}>
                Tag Line
                <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
              </Typography>
            }
            placeholder='Enter the tag line'
            value={values.tagline}
            spacing={2}
            handleChange={handleChange('tagline')}
            disabled={false}
          />
          <JInputField
            topLabel={
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}>
                Button Link
                <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
              </Typography>
            }
            placeholder='Enter the tag line'
            value={values.buttonLink}
            spacing={2}
            handleChange={handleChange('buttonLink')}
            disabled={false}
          />
          <FormControl sx={{ marginBottom: 5 }}>
            <FormLabel
              sx={{
                color: 'text.primary',
                marginBottom: 1,
              }}>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}>
                Add a picture for Ad
                <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
              </Typography>
            </FormLabel>
            <UploadZone
              multiple={false}
              files={values.picture}
              selectedFile={values.picture}
              onFilesChange={handleFilesChange}
              onSelectedFileChange={handleSelectedFileChange}
              label1='Drag and drop or click to choose file'
              label2='Select the uploaded image.'
              accept='image/*'
            />
          </FormControl>
          <FormControl
            sx={{
              display: 'flex',
              justifyContents: 'center',
              alignItems: 'center',
            }}>
            <Button
              disabled={loading}
              variant='contained'
              sx={{ width: 200, textAlign: 'center' }}
              endIcon={<FaArrowCircleRight />}
              onClick={handleSubmit}>
              {loading ? <Loader /> : 'Submit'}
            </Button>
          </FormControl>
        </FormGroup>
      </Box>
    </>
  );
};

export default HomeAd;
