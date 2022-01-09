import {
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  lighten,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import {
  MdAccountBalanceWallet,
  MdCalendarToday,
  MdGridOff,
  MdLocalParking,
  MdLocationOn,
  MdOutlineStairs,
  MdPlayArrow,
  MdRoofing,
  MdWeekend
} from 'react-icons/md';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ToWords } from 'to-words';

import { shortenedPriceWords, isNumeric } from '../../utils/helpers';
import unitLabels from '../../constants/unitLabels';
import colors from '../../constants/colors.json';
import otherRoomLabels from '../../constants/otherRoomLabels';
import contactInfo from '../../constants/contactInfo.json';
import Emoji from '../../components/Emoji/Emoji';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true
  }
});

const RentLeaseView = ({ listing }) => {
  const theme = useTheme();
  const {
    societyName,
    location,
    landmark,
    apartmentType,
    rent,
    electricityIncluded,
    priceNegotiable,
    deposit,
    numBathrooms,
    numBalconies,
    carpetArea,
    builtUpArea,
    superBuiltUpArea,
    otherRooms,
    furnishing,
    coveredParking,
    openParking,
    totalFloors,
    propertyOnFloor,
    ageOfProperty,
    availableFrom,
    willingToRentOutTo,
    pictures,
    videoLink
  } = listing;

  let [backdropShown, setBackdropShown] = useState(false);

  const handleGalleryClick = (e) => {
    e.preventDefault();

    setBackdropShown(true);
  };

  const handleCloseBackdrop = (e) => {
    setBackdropShown(false);
  };

  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item container xs={12} sm={8}>
          <Grid item sm={8}>
            <Box sx={{ paddingTop: 5 }}>
              <Typography
                variant='h5'
                sx={{ fontWeight: 'bold', marginBottom: 0 }}
                component='div'>
                {`${unitLabels[apartmentType]} for rent in ${location}`}
              </Typography>
              {societyName !== '' && (
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontWeight: 'normal',
                    marginBottom: 1,
                    color: 'text.secondary'
                  }}
                  component='div'>
                  {societyName}
                </Typography>
              )}
              <Chip variant='outlined' color='primary' label='Home for rent' />
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
                    }}
                    component='div'>
                    ₹
                  </Typography>
                  <Typography
                    variant='h3'
                    sx={{
                      fontWeight: 'normal',
                      marginBottom: 1,
                      display: 'inline-block'
                    }}
                    component='div'>
                    {shortenedPriceWords(rent)}
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
                    }}
                    component='div'>
                    {deposit === '' ? (
                      'No Security Deposit'
                    ) : (
                      <span>
                        <span style={{ fontWeight: 'bold' }}>
                          Security Deposit:{' '}
                        </span>
                        {isNumeric(deposit)
                          ? toWords.convert(deposit)
                          : 'Error'}
                      </span>
                    )}
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
                {pictures.map((picture) => (
                  <ImageListItem key={picture}>
                    <img src={picture} alt={picture} loading='lazy' />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isPhone ? 'column' : 'row',
                justifyContent: isPhone ? 'flex-start' : 'space-between',
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
              {videoLink !== '' && (
                <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <MdPlayArrow color={theme.palette.primary.main} />
                  <Link
                    href={videoLink}
                    target='_blank'
                    rel='noopener noreferer'
                    underline='hover'
                    sx={{ marginLeft: 1 }}>
                    Click here to play the video
                  </Link>
                </Box>
              )}
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
                  p: { xs: 2, sm: 10 }
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    color: '#fff'
                  }}>
                  <FaTimes fontSize={30} />
                </Box>
                <ImageList variant='masonry' cols={isPhone ? 1 : 3} gap={10}>
                  {pictures.map((picture) => (
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
              Jai Ambe Real Estate Consultants are here to help you with your
              hunt for the best deal. With a track record of 10,000+ customers,
              we excel in bringing smiles on faces.
            </Typography>
            <Button
              variant='contained'
              color='primary'
              sx={{ marginBottom: 2 }}
              component={RouterLink}
              to='/contact'>
              Request Callback
            </Button>
            <Button
              variant='outlined'
              color='primary'
              component={Link}
              href={`tel:${contactInfo.phone}`}>
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
                {carpetArea !== '' && (
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
                      {`(${carpetArea} sq.ft.)`}
                    </Typography>
                  </Box>
                )}
                {builtUpArea !== '' && (
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
                      {`(${builtUpArea} sq.ft.)`}
                    </Typography>
                  </Box>
                )}
                {superBuiltUpArea !== '' && (
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
                      {`(${superBuiltUpArea} sq.ft.)`}
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
                  {`${unitLabels[apartmentType]}`}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    marginLeft: 2,
                    color: 'text.primary'
                  }}>
                  {`${numBathrooms} Bathrooms`}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    marginLeft: 2,
                    color: 'text.primary'
                  }}>
                  {`${numBalconies} Balconies`}
                </Typography>
                {otherRooms.length > 0 &&
                  otherRooms.map((room) => (
                    <Typography
                      key={room}
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
                  {`${landmark}, ${location}`}
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
                  Rent Details
                </Typography>
                <Box sx={{ marginBottom: 1 }}>
                  <Typography
                    variant='body1'
                    sx={{
                      marginLeft: 2,
                      color: 'text.primary'
                    }}>
                    {`Rs. ${shortenedPriceWords(rent)}`}
                  </Typography>
                  {!electricityIncluded && (
                    <Typography
                      variant='body2'
                      sx={{
                        marginLeft: 2,
                        color: 'text.secondary'
                      }}>
                      + Electricity &amp; water charges
                    </Typography>
                  )}
                  <Typography
                    variant='body2'
                    sx={{
                      marginLeft: 2,
                      color: 'text.secondary'
                    }}>
                    {priceNegotiable ? '(Negotiable)' : '(Non-negotiable)'}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      marginLeft: 2,
                      color: 'text.secondary'
                    }}>
                    {deposit === ''
                      ? 'No Security Deposit'
                      : `Security Deposit: Rs. ${shortenedPriceWords(deposit)}`}
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
                    {furnishing === 'furnished'
                      ? 'Furnished'
                      : furnishing === 'semiFurnished'
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
                  {coveredParking <= 0 && openParking <= 0 && (
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      None
                    </Typography>
                  )}
                  {coveredParking > 0 && (
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${coveredParking} Covered space${
                        coveredParking > 1 ? 's' : ''
                      }`}
                    </Typography>
                  )}
                  {openParking > 0 && (
                    <Typography
                      variant='body1'
                      sx={{
                        marginLeft: 2,
                        color: 'text.primary'
                      }}>
                      {`${openParking} Open space${openParking > 1 ? 's' : ''}`}
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
                    {ageOfProperty === '0-1yrs'
                      ? '0 - 1 years'
                      : ageOfProperty === '1-5yrs'
                      ? '1 - 5 years'
                      : ageOfProperty === '5-10yrs'
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
                    {`${propertyOnFloor} of ${totalFloors} floors`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item sm={12}>
          <Typography
            variant='subtitle1'
            sx={{
              display: 'inline-block',
              color: 'text.secondary',
              marginRight: 2
            }}>
            Availabile From:
          </Typography>
          <Typography
            variant='body1'
            sx={{ display: 'inline-block', color: 'text.primary' }}>
            {`${format(new Date(availableFrom), 'MMM dd, yyyy')}`}
          </Typography>
        </Grid>
        <Grid item sm={12}>
          <Typography
            variant='subtitle1'
            sx={{
              display: 'inline-block',
              color: 'text.secondary',
              marginRight: 2
            }}>
            Willing to rent out to:
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            sx={{ color: 'text.primary', flexWrap: 'wrap' }}>
            {willingToRentOutTo.includes('family') && (
              <Chip
                sx={{ marginBottom: 1 }}
                label={
                  <>
                    <Emoji symbol='👨‍👩‍👧‍👦' /> Family
                  </>
                }
              />
            )}
            {willingToRentOutTo.includes('singleMen') && (
              <Chip
                sx={{ marginBottom: 1 }}
                label={
                  <>
                    <Emoji symbol='👨' /> Single Men
                  </>
                }
              />
            )}
            {willingToRentOutTo.includes('singleWomen') && (
              <Chip
                sx={{ marginBottom: 1 }}
                label={
                  <>
                    <Emoji symbol='👩' /> Single Women
                  </>
                }
              />
            )}
            {willingToRentOutTo.includes('unmarriedCouples') && (
              <Chip
                sx={{ marginBottom: 1 }}
                label={
                  <>
                    <Emoji symbol='👫' /> Unmarried Couple
                  </>
                }
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default RentLeaseView;
