import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Typography,
  Card,
  Tabs,
  Tab,
  Button,
  styled,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  Divider,
  Autocomplete,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import locations from '../../constants/locations.json';

import PropertyCard from '../../components/PropertyCard';
import Footer from '../../components/Footer';
import { MdLocationOn } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { getListingsFuzzy } from '../../redux/slices/listings/listingsSlice';
import { shortenedPriceWords, shortenedPrice } from '../../utils/helpers';
import { HashLoader } from 'react-spinners';

const SearchCard = styled(Card)({
  maxWidth: '600px',
  borderRadius: '10px',
  margin: '40px auto 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const GalleryView = ({ mode = 'buy' }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  let [searchParams, setSearchParams] = useSearchParams();
  let query = searchParams.get('q') || '';
  let type =
    mode === 'buy'
      ? searchParams.get('type') === 'projects'
        ? 'sellproject'
        : searchParams.get('type') === 'apartments'
        ? 'sellapartment'
        : 'buy'
      : 'rentlease';

  useEffect(() => {
    if (type === 'buy') {
      dispatch(
        getListingsFuzzy({ query, type: ['sellapartment', 'sellproject'] })
      );
      return;
    } else if (['sellapartment', 'sellproject', 'rentlease'].includes(type)) {
      dispatch(getListingsFuzzy({ query, type : [type]}));
        return;
    }
    // if (type === 'rentlease') {
    //   dispatch(getListingsFuzzy({ query, type }));
    //   return;
    // }
    // if (type === 'sellproject') {
    //   dispatch(getListingsFuzzy({ query, type }));
    //   return;
    // }
    // if (type === 'sellapartment') {
    //   dispatch(getListingsFuzzy({ query, type }));
    //   return;
    // }
  }, [dispatch, query, type]);

  const [tab, setTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [autoCompleteInput, setAutoCompleteInput] = useState('');

  useEffect(() => {
    setSearchInput('');
    setAutoCompleteInput('');
  }, [mode]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSearchInputChange = (event, newval) => {
    setSearchInput(newval);
  };

  const handleAutoCompleteInputChange = (event, newval) => {
    setAutoCompleteInput(newval);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    setSearchParams(
      mode === 'buy'
        ? {
            q: searchInput,
            type: tab ? 'apartments' : 'projects',
          }
        : {
            q: searchInput,
          }
    );
  };

  let content = useSelector((state) => state.listings.content);
  let loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );

  const tabs = ['Projects', 'Resale Homes'].map((l, i) => (
    <Tab key={i} label={l} sx={{ fontWeight: 'bold' }} />
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
            {mode === 'buy' ? 'Buy Homes in Mumbai' : 'Rent Homes in Mumbai'}
          </Typography>
          <Typography variant='body1' color='text.secondary' align='center'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tristique
            est congue integer integer at quis ac. Sed egestas pellentesque
            lectus amet ac id viverra.
          </Typography>
          <SearchCard
            sx={{
              py: 3,
              backgroundColor: mode === 'buy' ? '' : 'transparent',
              boxShadow:
                mode === 'buy' ? '1px 1px 57px -16px rgba(0,0,0,0.43)' : 'none',
            }}>
            {mode === 'buy' && (
              <>
                <Box sx={{ width: '100%', bgcolor: 'inherit' }}>
                  <Tabs value={tab} onChange={handleTabChange} centered>
                    {tabs}
                  </Tabs>
                </Box>
                <Divider sx={{ backgroundColor: 'grey', width: '100%' }} />
              </>
            )}
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              width={{ xs: '100%', md: '85%' }}
              mt={mode === 'buy' ? 3 : 0}
              sx={{ px: 3 }}>
              <Autocomplete
                freeSolo
                sx={{ width: '100%' }}
                options={locations}
                onInputChange={handleSearchInputChange}
                onChange={handleAutoCompleteInputChange}
                inputValue={searchInput}
                value={autoCompleteInput}
                disabled={loading}
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
                        alignItems: 'center',
                      }}>
                      <MdLocationOn fontSize={20} style={{ marginRight: 10 }} />
                      Search for a location
                    </InputLabel>
                    <OutlinedInput
                      id='standard-adornment-password'
                      type='text'
                      inputProps={{ ...params.inputProps }}
                      disabled={loading}
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
              <Button
                sx={{ marginLeft: 2, height: 50 }}
                variant='contained'
                onClick={handleSearchSubmit}
                disabled={loading}>
                Search
              </Button>
            </Box>
          </SearchCard>
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  pt: 20,
                  pb: 30,
                  backgroundColor: theme.palette.grey[0],
                }}>
                <HashLoader
                  color={theme.palette.primary.main}
                  style={{ display: 'block', margin: '100px' }}
                  size={150}
                />
              </Box>
            )}
            {!loading && content.ids.length === 0 && (
              <Typography
                variant='h3'
                sx={{ fontWeight: 'bold', color: 'grey.500', pt: 20, pb: 30 }}>
                Sorry! Not Found
              </Typography>
            )}
            {!loading &&
              content.ids.map((listingId) => {
                let type = content.listings[listingId].listingType;
                let image = content.listings[listingId][type].featuredPicture;
                let name = content.listings[listingId].name;
                let location = content.listings[listingId][type].location;
                let price = [];

                if (type === 'rentlease') {
                  price[0] = content.listings[listingId][type].rent;
                } else if (type === 'sellapartment') {
                  price[0] = content.listings[listingId][type].price;
                } else {
                  price = content.listings[listingId][type].units.map(
                    (u) => u.price
                  ); 
                }

                return (
                  <PropertyCard
                    key={listingId}
                    image={image}
                    title={name}
                    location={location}
                    price={shortenedPrice(price)}
                  />
                );
              })}
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default GalleryView;
