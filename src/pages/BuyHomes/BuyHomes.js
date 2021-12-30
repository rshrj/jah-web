import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  IconButton,
  Button,
  styled
} from '@mui/material';

import { HiSearch } from 'react-icons/hi';

import NavBar from '../../components/NavBar';
import PropertyCard from '../../components/PropertyCard';
import { getBuyHomes } from '../../redux/slices/property/propertySlice';
import Footer from '../../components/Footer';

const SearchCard = styled(Card)({
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  maxWidth: '650px',
  borderRadius: '10px',
  height: '150px',
  margin: '40px auto 0',
});

const Input = styled('input')({
  border: 'none',
  fontSize: '15px',
  outline: 'none',
  color: '#6c757d',
  '&::placeholder': {
    color: '#6c757d',
    fontFamily: 'Sen',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '15px',
    letterSpacing: '0.15px',
  },
});

const BuyHomes = () => {
  const dispatch = useDispatch();
  const buyHomes = useSelector((state) => state.property.buyHomes);

  useEffect(() => {
    dispatch(getBuyHomes());
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ['PROJECTS', 'RESALE HOMES'].map((l, i) => (
    <Tab key={i} label={l} id='simple-tab-0' sx={{ fontWeight: 'bold' }} />
  ));

  return (
    <>
      <NavBar loggedIn={false} />

      <Box sx={{ pt: '30px' }}>
        <Typography variant='h3' color='grey.700' align='center'>
          Buy Homes
        </Typography>
        <Typography variant='body1' color='primary' align='center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique est
          congue integer integer at quis ac. Sed egestas pellentesque lectus
          amet ac id viverra.
        </Typography>
        <SearchCard>
          <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleChange} centered>
              {tabs}
            </Tabs>
          </Box>

          <Box display='flex' justifyContent='center' width='100%' mt='30px'>
            <IconButton sx={{ pr: '10px' }}>
              <HiSearch sx={{ color: '#6C757D', fontSize: '30px' }} />
            </IconButton>
            <Input
              sx={{ width: '100%', maxWidth: '300px', padding: '0 15px' }}
              placeholder='Enter Locality'
            />
            <Button
              size='small'
              variant='contained'
              sx={{
                width: '100px',
                height: '35px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
              }}>
              SEARCH
            </Button>
          </Box>
        </SearchCard>
        <Box sx={{ mt: 4, ml: 12 }}>
          <IconButton sx={{}}>
            <HiSearch sx={{ color: '#6C757D', fontSize: '30px' }} />
          </IconButton>
          <Input
            sx={{ '::placeholder': { fontWeight: 'bold' }, p: 0 }}
            placeholder='Filter By Location'
          />
        </Box>
        <Box
          sx={{
            maxWidth: '1360px',
            margin: '20px auto 0',
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((m, i) => (
            <PropertyCard
              key={i}
              image='https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true'
              title='Hiranandani Towers'
              location='Vashi'
              price='20-30L'
            />
          ))}
          {buyHomes.map((m, i) => (
            <PropertyCard
              key={i}
              image={m.image}
              title={m.title}
              location={m.location}
              price={m.price}
            />
          ))}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default BuyHomes;
