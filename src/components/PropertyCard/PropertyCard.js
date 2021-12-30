import React from 'react';

import {
  Typography,
  Card,
  styled,
  CardMedia,
  CardContent,
  Grid,
} from '@mui/material';

import { BiRupee } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

const MyCard = styled(Card)({
  margin: '10px 30px',
  width: '280px',
  height: '280px',
  boxShadow: '0px 4px 8px -2px rgba(0, 0, 0, 0.35)',
});

const PropertyCard = ({ image, title, location, price }) => {
  return (
    <>
      <MyCard>
        <CardMedia
          height='190px'
          sx={{ width: '260px', m: '10px auto 0' }}
          component='img'
          image={image}
        />
        <CardContent>
          <Typography variant='h6'>{title}</Typography>
          <Grid container>
            <Grid item display='flex' alignItems='center' width='50%'>
              <MdLocationOn
                style={{
                  fontSize: '15px',
                  marginRight: '5px',
                  color: '#6c757d',
                }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  letterSpacing: '0.1px',
                  color: '#6c757d',
                }}>
                {location}
              </Typography>
            </Grid>
            <Grid item sx={{ pl: '65px' }} display='flex' alignItems='center'>
              <BiRupee
                style={{ height: '15px', width: '15px', color: '#6c757d' }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  letterSpacing: '0.15px',
                  color: '#6c757d',
                }}>
                {price}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </MyCard>
    </>
  );
};

export default PropertyCard;
