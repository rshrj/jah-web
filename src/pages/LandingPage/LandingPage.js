import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  styled,
  Typography,
  Button,
  Card,
  Tab,
  Tabs,
  Divider,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  Container,
  useMediaQuery,
  Paper
} from '@mui/material';
import { MdLocationOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';

import locations from '../../constants/locations.json';

import landing1 from '../../assets/images/marketing.png';
import landing2 from '../../assets/images/trust.png';
import landing3 from '../../assets/images/best-deals.png';
import landing4 from '../../assets/images/stellar-performance.png';

import Footer from '../../components/Footer';
import Testimonials from './Testimonials';
import CallBackRequest from './CallBackRequest';
import FeaturedProperties from './FeaturedProperties';
import LandingHeader from './LandingHeader';
import { setTransparent } from '../../redux/slices/settings/settingsSlice';

const SearchCard = styled(Card)({
  maxWidth: '700px',
  borderRadius: '10px',
  margin: '-20px auto 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative'
});

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const dispatch = useDispatch();

  let [tab, setTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [autoCompleteInput, setAutoCompleteInput] = useState('');

  // const transparent = useSelector((state) => state.settings.transparent);

  useEffect(() => {
    const listenScrollEvent = (e) => {
      if (window.scrollY > 560) {
        dispatch(setTransparent(false));
      } else if (window.scrollY < 560) {
        dispatch(setTransparent(true));
      }
    };

    dispatch(setTransparent(true));
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      dispatch(setTransparent(false));
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, [dispatch]);

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

    if (searchInput === '') {
      return;
    }

    let prefix = tab === 0 || tab === 1 ? 'forbuyers' : 'fortenants';
    let type =
      tab === 0 ? '&type=projects' : tab === 1 ? '&type=apartments' : '';
    navigate(`/${prefix}?q=${searchInput}${type}`);
  };

  let loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );

  const tabs = ['New Projects', 'Resale Homes', 'Rent / Lease'].map((l, i) => (
    <Tab key={i} label={l} sx={{ fontWeight: 'bold', fontSize: '0.8em' }} />
  ));

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <LandingHeader />

      <Container maxWidth='xl' sx={{ zIndex: 100, position: 'relative' }}>
        <SearchCard
          sx={{
            py: 3,
            pt: 1,
            boxShadow: '1px 1px 57px -16px rgba(0,0,0,0.43)'
          }}>
          <Box sx={{ width: '100%', bgcolor: 'inherit' }}>
            <Tabs value={tab} onChange={handleTabChange} centered>
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
            sx={{ px: 3 }}
            component='form'
            autoComplete='off'>
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
              type='submit'
              sx={{ marginLeft: 2, height: 50 }}
              variant='contained'
              onClick={handleSearchSubmit}
              disabled={loading}>
              Search
            </Button>
          </Box>
        </SearchCard>

        <Box sx={{ zIndex: 1000, position: 'relative', marginTop: '150px' }}>
          <Typography
            textAlign='center'
            variant={isPhone ? 'h4' : 'h3'}
            color='text.secondary'
            sx={{ marginTop: 5 }}>
            Mumbai’s Best Real Estate Advisory Firm
          </Typography>
          <Typography
            textAlign='center'
            variant={isPhone ? 'h5' : 'h4'}
            color='primary.main'
            fontWeight='bold'>
            #GoodbyeHeadaches
          </Typography>
        </Box>

        <FeaturedProperties />
      </Container>
      <Box
        sx={{
          backgroundColor: 'common.white'
        }}>
        <Container maxWidth='xl'>
          <Box
            sx={{
              marginBottom: 3
            }}>
            <Typography
              textAlign='center'
              variant={isPhone ? 'h4' : 'h3'}
              color='primary.main'
              sx={{ marginTop: 5, marginBottom: 1, paddingTop: 5 }}>
              Why Jai Ambe Advisory?
            </Typography>
            <Typography
              textAlign='center'
              variant={isPhone ? 'subtitle1' : 'h6'}
              color='text.secondary'>
              Finding your dream home is our real passion. Leave the hard work
              to experts.
            </Typography>
          </Box>

          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              px: 15,
              paddingBottom: 5
            }}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha('#c100c5', 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <img
                src={landing1}
                width='100px'
                height='100px'
                alt='Marketing Powerhouse'
              />
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Marketing Powerhouse
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Extensive connections
              </Typography>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha('#4b732c', 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <img
                src={landing2}
                width='100px'
                height='100px'
                alt='Trusted Transactions'
              />
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Trusted Transactions
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Verified sellers and buyers
              </Typography>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha('#007fff', 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <img
                src={landing3}
                width='100px'
                height='100px'
                alt='Best Deals'
              />
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Best Deals
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Large property database
              </Typography>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha('#431ad3', 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <img
                src={landing4}
                width='100px'
                height='100px'
                alt='Stellar Performance'
              />
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Stellar Performance
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Finding the right fit for buyers
              </Typography>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <Typography variant='h2' color='primary.main'>
                10,000+
              </Typography>
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Happy Customers
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Pairing the dream homes
              </Typography>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                minWidth: { xs: 300, sm: 280 },
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                boxShadow: '0px 0px 20px -15px rgba(0,0,0,0.40)',
                height: 280,
                px: 4,
                py: 5,
                m: 2
              }}>
              <Typography variant='h2' color='primary.main'>
                18+
              </Typography>
              <Typography variant='h6' sx={{ marginTop: 3 }}>
                Successful Years
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                Empowering real estate world
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      <Testimonials />

      <CallBackRequest />

      <Divider />
      <Footer />
    </>
  );
};

export default LandingPage;
