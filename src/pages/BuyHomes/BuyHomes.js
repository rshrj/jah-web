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
  Input,
  styled,
  Container,
  useTheme,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Divider,
  lighten,
  Autocomplete
} from '@mui/material';

import { HiSearch } from 'react-icons/hi';

import locations from '../../constants/locations.json';

import NavBar from '../../components/NavBar';
import PropertyCard from '../../components/PropertyCard';
import { getBuyHomes } from '../../redux/slices/property/propertySlice';
import Footer from '../../components/Footer';
import { JInputSearch } from '../../components/JInputField';
import { MdLocationCity, MdLocationOn, MdSearch } from 'react-icons/md';

const SearchCard = styled(Card)({
  boxShadow: '1px 1px 57px -16px rgba(0,0,0,0.43)',
  maxWidth: '600px',
  borderRadius: '10px',
  margin: '40px auto 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const Input2 = styled('input')({
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
    letterSpacing: '0.15px'
  }
});

const BuyHomes = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const buyHomes = useSelector((state) => state.property.buyHomes);

  useEffect(() => {
    dispatch(getBuyHomes());
  }, [dispatch]);

  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const tabs = ['PROJECTS', 'RESALE HOMES'].map((l, i) => (
    <Tab key={i} label={l} id='simple-tab-0' sx={{ fontWeight: 'bold' }} />
  ));

  return (
    <>
      <Container maxWidth='xl'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            Buy Homes in Mumbai
          </Typography>
          <Typography variant='body1' color='text.secondary' align='center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
            est congue integer integer at quis ac. Sed egestas pellentesque
            lectus amet ac id viverra.
          </Typography>
          <SearchCard
            sx={{
              py: 3
              // boxShadow: 'none',
              // border: `1px dashed ${lighten(theme.palette.grey[200], 0)}`,
              // backgroundColor: `${lighten(theme.palette.common.white, 0)}`
            }}>
            <Box sx={{ width: '100%', bgcolor: 'inherit' }}>
              <Tabs value={value} onChange={handleChange} centered>
                {tabs}
              </Tabs>
            </Box>
            <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              width={{ xs: '100%', md: '85%' }}
              mt={3}
              sx={{ px: 3 }}>
              {/* <IconButton sx={{ pr: '10px' }}>
                <HiSearch sx={{ color: 'grey.200', fontSize: '30px' }} />
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
                    boxShadow: 'none'
                  }
                }}>
                SEARCH
              </Button> */}
              <Autocomplete
                sx={{ width: '100%' }}
                options={locations}
                renderInput={(params) => (
                  <FormControl
                    sx={{ width: '100%' }}
                    ref={params.InputProps.ref}
                    variant='outlined'>
                    <InputLabel
                      htmlFor='standard-adornment-password'
                      ref={params.InputLabelProps.ref}
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                      <MdLocationOn fontSize={20} style={{ marginRight: 10 }} />
                      Search for a location
                    </InputLabel>
                    <OutlinedInput
                      id='standard-adornment-password'
                      type='text'
                      inputProps={{ ...params.inputProps }}
                      label={
                        <>
                          <MdLocationOn
                            fontSize={20}
                            style={{ marginRight: 10 }}
                          />
                          Search for a location
                        </>
                      }
                    />
                  </FormControl>
                )}
              />
              <Button sx={{ marginLeft: 2, height: 50 }} variant='contained'>
                Search
              </Button>
            </Box>
          </SearchCard>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
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
      </Container>
      <Footer />
    </>
  );
};

export default BuyHomes;
