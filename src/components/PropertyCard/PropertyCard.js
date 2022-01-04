import React from 'react';

import {
  Typography,
  Card,
  styled,
  CardMedia,
  CardContent,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { BiRupee } from 'react-icons/bi';
import { MdLocationOn } from 'react-icons/md';

const MyCard = styled(Card)(({ theme }) => ({
  margin: '20px 10px',
  maxWidth: '290px',
  height: '280px',
  // boxShadow: '1px 1px 57px -16px rgba(0,0,0,0.43)'
  boxShadow: '0px 0px 38px -20px rgba(0,0,0,0.40)',
  borderRadius: '0px',
  transition: '0.2s ease',
  borderBottom: `0px solid ${theme.palette.primary.main}`,
  '&:hover': {
    transform: 'scale(1.01)',
    borderBottomWidth: '5px',
    cursor: 'pointer'
  }
}));

const PropertyCard = ({ image, title, location, price, link }) => {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    event.preventDefault();

    if (!link) {
      return;
    }

    navigate(link);
  };

  return (
    <>
      <MyCard onClick={handleCardClick}>
        <CardMedia
          height='190px'
          sx={{ minWidth: '290px' }}
          component='img'
          image={image}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant='h6'>{title}</Typography>
          <Grid container>
            <Grid item display='flex' alignItems='center' width='50%'>
              <MdLocationOn
                style={{
                  fontSize: '15px',
                  marginRight: '5px',
                  color: '#6c757d'
                }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  letterSpacing: '0.1px',
                  color: '#6c757d'
                }}>
                {location}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{ width: '50%' }}
              display='flex'
              alignItems='center'
              justifyContent='flex-end'>
              <BiRupee
                style={{ height: '15px', width: '15px', color: '#6c757d' }}
              />
              <Typography
                sx={{
                  fontSize: '13px',
                  letterSpacing: '0.15px',
                  color: '#6c757d'
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
