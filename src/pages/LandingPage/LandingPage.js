import React, { useState } from 'react';
import {
  Box,
  styled,
  CardMedia,
  Grid,
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
  Paper,
  Avatar,
  Pagination,
  FormGroup
} from '@mui/material';
import { MdLocationOn } from 'react-icons/md';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { alpha, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import locations from '../../constants/locations.json';
// import landing1 from '../../assets/vectors/landing-1.svg';
import landing1 from '../../assets/images/marketing.png';
// import landing2 from '../../assets/vectors/landing-2.svg';
import landing2 from '../../assets/images/trust.png';
// import landing3 from '../../assets/vectors/landing-3.svg';
import landing3 from '../../assets/images/best-deals.png';
// import landing4 from '../../assets/vectors/landing-4.svg';
import landing4 from '../../assets/images/stellar-performance.png';
import homeAdPlaceholder from '../../assets/images/homead-placeholder-2.png';
import { stringAvatar } from '../../utils/avatars';
import { shortenedPriceWords } from '../../utils/helpers';

import PropertyCard from '../../components/PropertyCard';
import { JInputField } from '../../components/JInputField';
import Footer from '../../components/Footer';

const Poster = styled(Grid)(({ theme }) => ({
  backgroundImage: `url("${homeAdPlaceholder}")`,
  backgroundSize: 'cover',
  backdropFilter: `blur(1.5rem)`,
  WebkitBackdropFilter: `blur(1.5rem)`,
  minHeight: '250px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0.8
  },
  '& > *': {
    zIndex: 100
  }
}));

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

  let [tab, setTab] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [autoCompleteInput, setAutoCompleteInput] = useState('');

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
  };

  let loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );

  const tabs = ['Projects', 'Resale Homes', 'Rent / Lease'].map((l, i) => (
    <Tab key={i} label={l} sx={{ fontWeight: 'bold' }} />
  ));

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Poster container>
        {/* <Grid item sx={{ p: 0, m: 0 }}>
          <CardMedia
            component='img'
            image={homeAdPlaceholder0}
            sx={{ width: '320px', height: '250px', p: 0, m: 0 }}
          />
        </Grid> */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: { xs: 'center', sm: 'stretch' }
          }}>
          <Grid
            item
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch'
            }}>
            <Typography
              variant='h4'
              color='common.white'
              sx={{ maxWidth: 400 }}>
              Helping Mumbaikars find their perfect places
            </Typography>
            <Typography
              sx={{ marginBottom: 1, display: { xs: 'none', sm: 'block' } }}
              color='common.white'>
              Check our latest project offering &#8594;
            </Typography>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              display: { xs: 'none', sm: 'flex' }
            }}>
            <Grid item>
              <CardMedia
                component='img'
                image='https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true'
                sx={{ width: '260px', p: 3 }}
              />
            </Grid>
            <Grid
              item
              sx={{
                textAlign: { xs: 'center', sm: 'left' },
                position: 'relative'
              }}>
              <Typography variant='h4' color='common.white'>
                Arihant Skylines
              </Typography>
              <Typography sx={{ marginBottom: 1 }} color='common.white'>
                1, 2 BHKs starting at Rs. 20L+
              </Typography>
              <Button variant='contained' disableElevation>
                Learn More
              </Button>
            </Grid>
          </Box>
        </Container>
      </Poster>
      <Container maxWidth='xl' sx={{}}>
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

        <Box>
          <Typography
            textAlign='center'
            variant={isPhone ? 'h4' : 'h3'}
            color='text.secondary'
            sx={{ marginTop: 5 }}>
            Mumbai's Best Real Estate Consultant
          </Typography>
          <Typography
            textAlign='center'
            variant={isPhone ? 'h5' : 'h4'}
            color='primary.main'
            fontWeight='bold'>
            #GoodbyeHeadaches
          </Typography>
        </Box>

        <Box>
          <Grid
            container
            sx={{ marginTop: { xs: 5, sm: 8 }, px: { xs: 0, sm: 15 } }}>
            <Grid item xs={12} sm={6}>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  color: 'primary.main'
                }}>
                <Typography
                  variant='h5'
                  sx={{
                    marginRight: 2,
                    paddingTop: 0,
                    block: 'block',
                    color: 'primary.main'
                  }}>
                  Buy your Dream Home
                </Typography>
                <FaArrowRight />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                textAlign: { xs: 'center', sm: 'right' },
                display: { xs: 'none', sm: 'block' }
              }}>
              <Button
                variant='outlined'
                size='small'
                component={RouterLink}
                to='/forbuyers'>
                View More
              </Button>
            </Grid>
          </Grid>

          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((listingId) => {
              // let type = content.listings[listingId].type;
              // let image = content.listings[listingId][type].featuredPicture;
              // let name = content.listings[listingId].name;
              // let location = content.listings[listingId].location;
              // let price = content.listings[listingId].price;
              return (
                <PropertyCard
                  key={listingId}
                  image='https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true'
                  title='Hiranandani Apartments'
                  location='Vashi'
                  price={shortenedPriceWords(1343020)}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Button
              variant='outlined'
              size='small'
              component={RouterLink}
              to='/forbuyers'>
              View More
            </Button>
          </Box>
        </Box>

        <Box>
          <Grid
            container
            sx={{ marginTop: { xs: 5, sm: 8 }, px: { xs: 0, sm: 15 } }}>
            <Grid item xs={12} sm={6}>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  color: 'primary.main'
                }}>
                <Typography
                  variant='h5'
                  sx={{
                    marginRight: 2,
                    paddingTop: 0,
                    block: 'block',
                    color: 'primary.main'
                  }}>
                  Rent / Lease property
                </Typography>
                <FaArrowRight />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                textAlign: { xs: 'center', sm: 'right' },
                display: { xs: 'none', sm: 'block' }
              }}>
              <Button
                variant='outlined'
                size='small'
                component={RouterLink}
                to='/fortenants'>
                View More
              </Button>
            </Grid>
          </Grid>

          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
            {[1, 2, 3, 4].map((listingId) => {
              // let type = content.listings[listingId].type;
              // let image = content.listings[listingId][type].featuredPicture;
              // let name = content.listings[listingId].name;
              // let location = content.listings[listingId].location;
              // let price = content.listings[listingId].price;
              return (
                <PropertyCard
                  key={listingId}
                  image='https://github.com/manikmmalhotra/slack-clone/blob/master/apartment%20(1)%201.png?raw=true'
                  title='Hiranandani Apartments'
                  location='Vashi'
                  price={shortenedPriceWords(1343020)}
                />
              );
            })}
          </Box>

          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Button
              variant='outlined'
              size='small'
              component={RouterLink}
              to='/fortenants'>
              View More
            </Button>
          </Box>
        </Box>
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
              Why Jai Ambe Homes?
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
                21+
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
      <Box>
        <Container maxWidth='xl'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 5,
              px: { xs: 0, sm: 15 },
              marginBottom: 3
            }}>
            <Button
              variant='outlined'
              size='small'
              sx={{
                visibility: 'hidden',
                display: { xs: 'none', sm: 'block' }
              }}>
              Submit Testimonial
            </Button>
            <Box sx={{}}>
              <Typography
                textAlign='center'
                variant={isPhone ? 'h4' : 'h3'}
                color='primary.main'
                sx={{ marginBottom: 1 }}>
                Notes from our clients
              </Typography>
              <Typography
                textAlign='center'
                variant={isPhone ? 'subtitle1' : 'h6'}
                color='text.secondary'>
                Our work speaks for itself. Read the happy notes from our
                clients.
              </Typography>
            </Box>
            <Button
              variant='outlined'
              size='small'
              sx={{
                marginTop: { xs: 2, sm: 0 }
              }}
              component={RouterLink}
              to='/submittestimonial'>
              Submit Testimonial
            </Button>
          </Box>

          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              px: { xs: 0, sm: 15 }
            }}>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                px: 4,
                py: 2,
                maxWidth: 350,
                m: 2,
                borderLeft: `10px solid ${theme.palette.primary.main}`
              }}>
              <Box sx={{ textAlign: 'left' }}>
                <FaQuoteLeft fontSize={30} color={theme.palette.primary.main} />
              </Box>
              <Typography variant='body1' sx={{ marginTop: 1 }}>
                They provided stellar service and left me spell bound. Will
                definitely choose again.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  marginTop: 2
                }}>
                <Avatar
                  {...stringAvatar(`John Doe}`, {
                    height: 60,
                    width: 60,
                    fontSize: 30,
                    marginRight: 2
                  })}
                />
                <Box>
                  <Typography variant='h6'>John Doe</Typography>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Web Space Inc.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                px: 4,
                py: 2,
                maxWidth: 350,
                m: 2,
                borderLeft: `10px solid ${theme.palette.primary.main}`
              }}>
              <Box sx={{ textAlign: 'left' }}>
                <FaQuoteLeft fontSize={30} color={theme.palette.primary.main} />
              </Box>
              <Typography variant='body1' sx={{ marginTop: 1 }}>
                They provided stellar service and left me spell bound. Will
                definitely choose again
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'align',
                  alignItems: 'center',
                  marginTop: 2
                }}>
                <Avatar
                  {...stringAvatar(`John Doe}`, {
                    height: 60,
                    width: 60,
                    fontSize: 30,
                    marginRight: 2
                  })}
                />
                <Box>
                  <Typography variant='h6'>John Doe</Typography>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Web Space Inc.
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                px: 4,
                py: 2,
                maxWidth: 350,
                m: 2,
                borderLeft: `10px solid ${theme.palette.primary.main}`
              }}>
              <Box sx={{ textAlign: 'left' }}>
                <FaQuoteLeft fontSize={30} color={theme.palette.primary.main} />
              </Box>
              <Typography variant='body1' sx={{ marginTop: 1 }}>
                They provided stellar service and left me spell bound. Will
                definitely choose again
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'align',
                  alignItems: 'center',
                  marginTop: 2
                }}>
                <Avatar
                  {...stringAvatar(`John Doe}`, {
                    height: 60,
                    width: 60,
                    fontSize: 30,
                    marginRight: 2
                  })}
                />
                <Box>
                  <Typography variant='h6'>John Doe</Typography>
                  <Typography variant='subtitle2' color='text.secondary'>
                    Web Space Inc.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
              mb: 5
            }}>
            <Pagination count={10} color='primary' />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: 'common.white'
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
              px: { xs: 0, sm: 15 }
            }}>
            <Box sx={{}}>
              <Typography
                textAlign='center'
                variant={isPhone ? 'h4' : 'h3'}
                color='primary.main'
                sx={{ marginBottom: 1 }}>
                Request a Call Back
              </Typography>
              <Typography
                textAlign='center'
                variant={isPhone ? 'subtitle1' : 'h6'}
                color='text.secondary'>
                Enter your details and query here. We will get back to you soon.
              </Typography>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 3, maxWidth: 600 }}>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <JInputField
                    topLabel='Name'
                    placeholder='Enter your name'
                    spacing={0}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormGroup>
                  <JInputField
                    topLabel='Phone'
                    placeholder='Enter your phone number'
                    spacing={0}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <JInputField
                    topLabel='Message'
                    placeholder='"Please call me back"'
                    spacing={0}
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={12} textAlign='center'>
                <Button
                  variant='contained'
                  sx={{ marginTop: 2, marginBottom: 5 }}>
                  Call Me
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Divider />
      <Footer />
    </>
  );
};

export default LandingPage;
