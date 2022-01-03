import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FaArrowRight } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { shortenedPrice } from '../../utils/helpers';
import { getFeaturedListings } from '../../redux/slices/listings/listingsSlice';

import PropertyCard from '../../components/PropertyCard';

const FeaturedProperties = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeaturedListings());
  }, [dispatch]);

  let buyproperties = useSelector((state) => state.listings.featured.buy);
  let rentproperties = useSelector((state) => state.listings.featured.rent);

  let loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );

  return (
    <>
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
          {loading && (
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
                Loading...
              </Typography>
            </Box>
          )}

          {!loading && buyproperties.ids.length === 0 && (
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
            buyproperties.ids.length > 0 &&
            buyproperties.ids.map((listingId) => {
              let type = buyproperties.listings[listingId].type;
              let image =
                buyproperties.listings[listingId][type].featuredPicture;
              let name = buyproperties.listings[listingId].name;
              let location = buyproperties.listings[listingId][type].location;
              let prices =
                type === 'sellapartment'
                  ? [buyproperties.listings[listingId][type].price]
                  : buyproperties.listings[listingId][type].apartmentTypes.map(
                      (u) =>
                        buyproperties.listings[listingId][type].units[u].price
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
          {loading && (
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
                Loading...
              </Typography>
            </Box>
          )}

          {!loading && rentproperties.ids.length === 0 && (
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
            rentproperties.ids.length > 0 &&
            rentproperties.ids.map((listingId) => {
              let type = rentproperties.listings[listingId].type;
              let image =
                rentproperties.listings[listingId][type].featuredPicture;
              let name = rentproperties.listings[listingId].name;
              let location = rentproperties.listings[listingId][type].location;
              let prices = [rentproperties.listings[listingId][type].price];

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
    </>
  );
};

export default FeaturedProperties;
