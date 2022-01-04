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
  Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import locations from '../../constants/locations.json';

import PropertyCard from '../../components/PropertyCard';
import Footer from '../../components/Footer';
import { MdLocationOn } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { getListingsFuzzy } from '../../redux/slices/listings/listingsSlice';
import { shortenedPrice } from '../../utils/helpers';
import { HashLoader } from 'react-spinners';

const SearchCard = styled(Card)({
  maxWidth: '600px',
  borderRadius: '10px',
  margin: '40px auto 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const GalleryView = ({ mode = 'buy', initTab = 0 }) => {
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
    }
    if (type === 'rentlease') {
      dispatch(getListingsFuzzy({ query, type: [type] }));
      return;
    }
    if (type === 'sellproject') {
      setTab(0);
      dispatch(getListingsFuzzy({ query, type: [type] }));
      return;
    }
    if (type === 'sellapartment') {
      setTab(1);
      dispatch(getListingsFuzzy({ query, type: [type] }));
      return;
    }
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
            type: tab ? 'apartments' : 'projects'
          }
        : {
            q: searchInput
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
            {mode === 'buy'
              ? "Make your move to Mumbai's best properties. Start hunting homes right away. Jai Ambe Advisory is here to ensure your best deal."
              : "Get the perfect space for your needs. It's time to rent homes in Mumbai. Get the best deal on rents with Jai Ambe Advisory."}
          </Typography>
          <SearchCard
            sx={{
              py: 3,
              backgroundColor: mode === 'buy' ? '' : 'transparent',
              boxShadow:
                mode === 'buy' ? '1px 1px 57px -16px rgba(0,0,0,0.43)' : 'none'
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
                        alignItems: 'center'
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
              flexWrap: 'wrap'
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
                  backgroundColor: theme.palette.grey[0]
                }}>
                <HashLoader
                  color={theme.palette.primary.main}
                  style={{ display: 'block', margin: '100px' }}
                  size={150}
                />
              </Box>
            )}

            {!loading && content.ids.length === 0 && (
              <Box
                sx={{
                  marginTop: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  px: { xs: 0, sm: 15 }
                }}>
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 'bold',
                    color: 'grey.500',
                    textAlign: 'center',
                    mb: 3
                  }}>
                  No properties at the moment :&#40;
                </Typography>
              </Box>
            )}

            {!loading &&
              content.ids.length > 0 &&
              content.ids.map((listingId) => {
                let type = content.listings[listingId].type;
                let image = content.listings[listingId][type].featuredPicture;
                let name = content.listings[listingId].name;
                let location = content.listings[listingId][type].location;
                let prices =
                  type === 'sellapartment'
                    ? [content.listings[listingId][type].price]
                    : type === 'rentlease'
                    ? [content.listings[listingId][type].rent]
                    : content.listings[listingId][type].apartmentTypes.map(
                        (u) => content.listings[listingId][type].units[u].price
                      );

                return (
                  <PropertyCard
                    key={listingId}
                    image={image}
                    title={name}
                    location={location}
                    price={shortenedPrice(prices)}
                    link={`/listing/${listingId}`}
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
