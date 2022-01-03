import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { Container, Typography } from '@mui/material';
import { useTheme, css } from '@mui/material/styles';
import { HashLoader } from 'react-spinners';

import {
  getPublicListingById,
  getRelatedListings
} from '../../redux/slices/listings/listingsSlice';
import { shortenedPrice } from '../../utils/helpers';
import PropertyCard from '../../components/PropertyCard';
import Footer from '../../components/Footer';
import SellApartmentView from './SellApartmentView';
import RentLeaseView from './RentLeaseView';
import SellProjectView from './SellProjectView';

const ListingView = () => {
  let { listingId } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getPublicListingById(listingId));
    dispatch(getRelatedListings(listingId));
  }, [dispatch, listingId]);

  let loading = useSelector(
    (state) => state.listings.fetchLoading === 'loading'
  );
  let listing = useSelector((state) => state.listings.single);
  let relatedProperties = useSelector((state) => state.listings.content);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.grey[0]
          }}>
          <HashLoader
            color={theme.palette.primary.main}
            css={css`
              display: block;
              margin: 100px;
            `}
            size={150}
          />
        </Box>
      ) : (
        <Container maxWidth='lg'>
          {listing.type === 'sellapartment' && (
            <SellApartmentView listing={listing.sellapartment} />
          )}
          {listing.type === 'rentlease' && (
            <RentLeaseView listing={listing.rentlease} />
          )}
          {listing.type === 'sellproject' && (
            <SellProjectView listing={listing.sellproject} />
          )}

          <Box sx={{ mt: 2 }}>
            <Typography variant='h3' color='primary.main' fontWeight='bold'>
              Related Properties
            </Typography>

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

              {!loading && relatedProperties.ids.length === 0 && (
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
                relatedProperties.ids.length > 0 &&
                relatedProperties.ids.map((listingId) => {
                  let type = relatedProperties.listings[listingId].type;
                  let image =
                    relatedProperties.listings[listingId][type].featuredPicture;
                  let name = relatedProperties.listings[listingId].name;
                  let location =
                    relatedProperties.listings[listingId][type].location;
                  let prices =
                    type === 'sellapartment'
                      ? [relatedProperties.listings[listingId][type].price]
                      : relatedProperties.listings[listingId][
                          type
                        ].apartmentTypes.map(
                          (u) =>
                            relatedProperties.listings[listingId][type].units[u]
                              .price
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
      )}
      <Footer />
    </>
  );
};

export default ListingView;
