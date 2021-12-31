import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import {
  Backdrop,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { useTheme, css, lighten } from '@mui/material/styles';
import { HashLoader } from 'react-spinners';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  MdGridOff,
  MdRoofing,
  MdLocationOn,
  MdAccountBalanceWallet,
  MdCheck,
  MdWeekend,
  MdLocalParking,
  MdCalendarToday,
  MdStairs,
  MdOutlineStairs,
  MdPlayArrow
} from 'react-icons/md';

import { getListingById } from '../../redux/slices/listings/listingsSlice';
import {
  setTopLoader,
  clearTopLoader
} from '../../redux/slices/misc/miscSlice';
import { shortenedPriceWords } from '../../utils/helpers';
import unitLabels from '../../constants/unitLabels';
import otherRoomLabels from '../../constants/otherRoomLabels';

const colors = [
  '#264653',
  '#2a9d8f',
  '#e9c46a',
  '#f4a261',
  '#e76f51',
  '#e63946',
  '#f95738',
  '#ffba08',
  '#4daa57',
  '#2f6690',
  '#9113a4'
];

const listing = {
  listingType: 'sellapartment',
  sellapartment: {
    societyname: 'Gokuldham Hillview',
    location: 'Mankhurd',
    landmark: 'Near HBCSE',
    apartmentType: '2bhk',
    price: '8345000',
    pricePerSqFt: '10000',
    allInclusivePrice: false,
    taxAndGovtChargesExcluded: true,
    priceNegotiable: true,
    numBathrooms: '2',
    numBalconies: '2',
    carpetArea: '834',
    builtUpArea: '',
    superBuiltUpArea: '1350',
    otherRooms: ['poojaRoom', 'studyRoom'],
    furnishing: 'furnished',
    coveredParking: '2',
    openParking: '0',
    totalFloors: '10',
    propertyOnFloor: '8',
    ageOfProperty: '0-1yrs',
    availabilityStatus: 'readyToMove',
    ownershipType: 'freehold',
    usp: 'A very nice place!',
    pictures: [
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
      'https://i.picsum.photos/id/12/800/600.jpg?hmac=OnuvMhu3pBo7i6hErvnN-U922LRgjb8pBHux29xEv34',
      'https://i.picsum.photos/id/229/800/600.jpg?hmac=XBz4BdHCdXDT8GerLNU_gH41Hv6gKY0beR0wprsUesQ',
      'https://i.picsum.photos/id/41/500/900.jpg?hmac=anOtTY6nmGpH2yWQzb8DA9QMUktr6y8X5QVfpuYpHXY',
      'https://i.picsum.photos/id/950/600/500.jpg?hmac=NplsaUFi8hC7-nsbDSXR9b0QBGtfo7-g11beSBNBpUc',
      'https://i.picsum.photos/id/570/800/600.jpg?hmac=uKkwPFnmvK2ixiYuqFoYCJE8CoEWXxFTCDF0syKNm0I',
      'https://i.picsum.photos/id/182/800/600.jpg?hmac=tljGSjfYZx-pg_MFSQUL-Emf_FGXS3FCXB3nlEBYFtY',
      'https://i.picsum.photos/id/699/500/900.jpg?hmac=CC4usCtofVGSafR68gmrqfIoqKyUeWbqDfGXNlsnBMI',
      'https://i.picsum.photos/id/689/800/600.jpg?hmac=9Ewgx9LpNR5YK4XHAXstG8gMaBlRyWG-EirYYVkaEVU',
      'https://i.picsum.photos/id/187/600/800.jpg?hmac=TtgRrLawCBefKSnxolzreh-dUucf0jxrfN0cQJ4Vmzg'
    ],
    featuredPicture:
      'https://i.picsum.photos/id/164/800/600.jpg?hmac=PXOkqOXBrKf4yZjDeJ3q5KtnTSFO4DOIJKNhBRDlKiY',
    videoLink: 'https://www.youtube.com/watch?v=2YBtspm8j8M&ab_channel=Dissolve'
  },
  createdBy: '61c86363686210e7fe8ffde0',
  createdAt: Date.now()
};

const SellApartmentListingView = () => {
  let { listingId } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const override = css`
    display: block;
    margin: 100px;
  `;

  // useEffect(() => {
  //   dispatch(getListingById(listingId));
  // }, [dispatch, listingId]);

  let listingA = useSelector((state) => state.listings.single);

  let [loading, setLoading] = useState(false);
  let [backdropShown, setBackdropShown] = useState(false);

  const handleGalleryClick = (e) => {
    e.preventDefault();

    setBackdropShown(true);
  };

  const handleCloseBackdrop = (e) => {
    setBackdropShown(false);
  };

  useEffect(() => {
    setLoading(true);
    dispatch(setTopLoader());
    setTimeout(() => {
      setLoading(false);
      dispatch(clearTopLoader());
    }, 100);
  }, [dispatch]);

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
            css={override}
            size={150}
          />
        </Box>
      ) : (
        <Container maxWidth='lg'>
          <Grid container spacing={2}>
            <Grid item container xs={12} sm={8}>
              <Grid item sm={8}>
                <Box sx={{ paddingTop: 5 }}>
                  <Typography
                    variant='h5'
                    sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    {`${
                      unitLabels[listing.sellapartment.apartmentType]
                    } for sale in ${listing.sellapartment.location}`}
                  </Typography>
                  {listing.sellapartment.societyname !== '' && (
                    <Typography
                      variant='subtitle1'
                      sx={{
                        fontWeight: 'normal',
                        marginBottom: 1,
                        color: 'text.secondary'
                      }}>
                      {listing.sellapartment.societyname}
                    </Typography>
                  )}
                  <Chip
                    variant='outlined'
                    color='primary'
                    label='Apartment for sale'
                  />
                </Box>
              </Grid>
              <Grid item sm={4}>
                <Box display='flex' sx={{ paddingTop: 5 }}>
                  <Divider
                    orientation='vertical'
                    variant='middle'
                    flexItem
                    sx={{ marginLeft: -5, marginRight: 5 }}
                  />
                  <Box>
                    <Box>
                      <Typography
                        variant='body1'
                        sx={{
                          marginBottom: 1,
                          display: 'inline-block',
                          marginRight: 1,
                          color: 'text.secondary'
                        }}>
                        ₹
                      </Typography>
                      <Typography
                        variant='h3'
                        sx={{
                          fontWeight: 'normal',
                          marginBottom: 1,
                          display: 'inline-block'
                        }}>
                        {shortenedPriceWords(listing.sellapartment.price)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          marginBottom: 1,
                          display: 'inline-block',
                          marginRight: 1,
                          color: 'text.secondary'
                        }}>
                        {`@ ${listing.sellapartment.pricePerSqFt} per sq.ft.`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={12} sx={{ paddingRight: 3 }}>
                <Box
                  onClick={handleGalleryClick}
                  sx={{
                    width: '100%',
                    height: 400,
                    overflowY: 'hidden',
                    p: 2
                  }}>
                  <ImageList variant='masonry' cols={3} gap={10}>
                    {listing.sellapartment.pictures.map((picture) => (
                      <ImageListItem key={picture}>
                        <img src={picture} alt={picture} loading='lazy' />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <Typography
                    color='text.secondary'
                    onClick={handleGalleryClick}
                    sx={{
                      display: 'inline-block',
                      m: 1,
                      '&:hover': {
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }
                    }}>
                    Click to enlarge
                  </Typography>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                    <MdPlayArrow color={theme.palette.primary.main} />
                    <Link
                      href={listing.sellapartment.videoLink}
                      target='_blank'
                      rel='noopener noreferer'
                      underline='hover'
                      sx={{ marginLeft: 1 }}>
                      Click here to play the video
                    </Link>
                  </Box>
                </Box>
                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)'
                  }}
                  open={backdropShown}
                  onClick={handleCloseBackdrop}>
                  <Box
                    onClick={handleGalleryClick}
                    sx={{
                      width: '100vw',
                      height: '100vh',
                      overflowY: 'scroll',
                      p: 10
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        color: '#fff'
                      }}>
                      <FaTimes fontSize={30} />
                    </Box>
                    <ImageList variant='masonry' cols={3} gap={10}>
                      {listing.sellapartment.pictures.map((picture) => (
                        <ImageListItem key={picture}>
                          <img src={picture} alt={picture} loading='lazy' />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                </Backdrop>
              </Grid>
            </Grid>
            <Grid item container xs={12} sm={4}>
              <Paper
                sx={{
                  p: 5,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: 'fit-content'
                }}>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: 3,
                    textAlign: 'center',
                    color: 'primary.main'
                  }}>
                  Get more details about this property
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ marginBottom: 3, textAlign: 'justify' }}>
                  Jai Ambe Real Estate Consultants are here to help you with
                  your hunt for the best deal. With a track record of 10,000+
                  customers, we excel in bringing smiles on faces.
                </Typography>
                <Button
                  variant='contained'
                  color='primary'
                  sx={{ marginBottom: 2 }}>
                  Request Callback
                </Button>
                <Button variant='outlined' color='primary'>
                  Call now
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              container
              sm={12}
              sx={{
                backgroundColor: lighten(theme.palette.primary.light, 0.9)
              }}>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdGridOff
                    fontSize={30}
                    color={colors[0]}
                    style={{ marginTop: theme.spacing(1) }}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Area
                    </Typography>
                    {listing.sellapartment.carpetArea !== '' && (
                      <Box sx={{ marginBottom: 1 }}>
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          Carpet Area
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            marginLeft: 2,
                            color: 'text.secondary'
                          }}>
                          {`(${listing.sellapartment.carpetArea} sq.ft.)`}
                        </Typography>
                      </Box>
                    )}
                    {listing.sellapartment.builtUpArea !== '' && (
                      <Box sx={{ marginBottom: 1 }}>
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          Built-up Area
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            marginLeft: 2,
                            color: 'text.secondary'
                          }}>
                          {`(${listing.sellapartment.builtUpArea} sq.ft.)`}
                        </Typography>
                      </Box>
                    )}
                    {listing.sellapartment.superBuiltUpArea !== '' && (
                      <Box sx={{ marginBottom: 1 }}>
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          Super Built-up Area
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{
                            marginLeft: 2,
                            color: 'text.secondary'
                          }}>
                          {`(${listing.sellapartment.superBuiltUpArea} sq.ft.)`}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdRoofing
                    fontSize={30}
                    color={colors[2]}
                    style={{ marginTop: theme.spacing(1) }}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Configuration
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${unitLabels[listing.sellapartment.apartmentType]}`}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${listing.sellapartment.numBathrooms} Bathrooms`}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${listing.sellapartment.numBalconies} Balconies`}
                    </Typography>
                    {listing.sellapartment.otherRooms.length > 0 &&
                      listing.sellapartment.otherRooms.map((room) => (
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          {otherRoomLabels[room]}
                        </Typography>
                      ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdLocationOn
                    fontSize={30}
                    color={colors[1]}
                    style={{ marginTop: theme.spacing(1) }}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Location
                    </Typography>

                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${listing.sellapartment.landmark}, ${listing.sellapartment.location}`}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdAccountBalanceWallet
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[4]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Price Details
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {`Rs. ${shortenedPriceWords(
                          listing.sellapartment.price
                        )}`}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          marginLeft: 2,
                          color: 'text.secondary'
                        }}>
                        {`at Rs. ${listing.sellapartment.pricePerSqFt} per sq.ft.`}
                      </Typography>
                      {listing.sellapartment.taxAndGovtChargesExcluded && (
                        <Typography
                          variant='body2'
                          sx={{
                            marginLeft: 2,
                            color: 'text.secondary'
                          }}>
                          + Tax &amp; Govt. charges extra
                        </Typography>
                      )}
                      {listing.sellapartment.allInclusivePrice && (
                        <Typography
                          variant='body2'
                          sx={{
                            marginLeft: 2,
                            color: 'text.secondary'
                          }}>
                          - All Inclusive Price
                        </Typography>
                      )}
                      <Typography
                        variant='body2'
                        sx={{
                          marginLeft: 2,
                          color: 'text.secondary'
                        }}>
                        {listing.sellapartment.priceNegotiable
                          ? '(Negotiable)'
                          : '(Non-negotiable)'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdWeekend
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[8]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Furnishing Details
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {listing.sellapartment.furnishing === 'furnished'
                          ? 'Furnished'
                          : listing.sellapartment.furnishing === 'semiFurnished'
                          ? 'Semi-Furnished'
                          : 'Unfurnished'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdLocalParking
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[6]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Reserved Parking
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      {listing.sellapartment.coveredParking <= 0 &&
                        listing.sellapartment.openParking <= 0 && (
                          <Typography
                            variant='body1'
                            sx={{
                              marginLeft: 2,
                              color: 'text.primary'
                            }}>
                            None
                          </Typography>
                        )}
                      {listing.sellapartment.coveredParking > 0 && (
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          {`${
                            listing.sellapartment.coveredParking
                          } Covered space${
                            listing.sellapartment.coveredParking > 1 ? 's' : ''
                          }`}
                        </Typography>
                      )}
                      {listing.sellapartment.openParking > 0 && (
                        <Typography
                          variant='body1'
                          sx={{
                            marginLeft: 2,
                            color: 'text.primary'
                          }}>
                          {`${listing.sellapartment.openParking} Open space${
                            listing.sellapartment.openParking > 1 ? 's' : ''
                          }`}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdCalendarToday
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[7]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Property Age
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {listing.sellapartment.ageOfProperty === '0-1yrs'
                          ? '0 - 1 years'
                          : listing.sellapartment.ageOfProperty === '1-5yrs'
                          ? '1 - 5 years'
                          : listing.sellapartment.ageOfProperty === '5-10yrs'
                          ? '5 - 10 years'
                          : '10+ years'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdOutlineStairs
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[9]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Floor Number
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {`${listing.sellapartment.propertyOnFloor} of ${listing.sellapartment.totalFloors} floors`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdOutlineStairs
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[9]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Floor Number
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {`${listing.sellapartment.propertyOnFloor} of ${listing.sellapartment.totalFloors} floors`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item sm={3}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    p: 2,
                    m: 1
                  }}>
                  <MdOutlineStairs
                    style={{ marginTop: theme.spacing(1) }}
                    fontSize={30}
                    color={colors[9]}
                  />
                  <Box>
                    <Typography
                      variant='subtitle1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      Floor Number
                    </Typography>
                    <Box sx={{ marginBottom: 1 }}>
                      <Typography
                        variant='body1'
                        sx={{
                          marginLeft: 2,
                          color: 'text.primary'
                        }}>
                        {`${listing.sellapartment.propertyOnFloor} of ${listing.sellapartment.totalFloors} floors`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default SellApartmentListingView;
