import { Box, Grid, Typography } from '@mui/material';
import { useTheme, lighten } from '@mui/material/styles';
import {
  MdAccountBalanceWallet,
  MdCalendarToday,
  MdGridOff,
  MdLocalParking,
  MdLocationOn,
  MdOutlineStairs,
  MdRoofing,
  MdWeekend
} from 'react-icons/md';

import colors from '../../constants/colors.json';
import unitLabels from '../../constants/unitLabels';
import otherRoomLabels from '../../constants/otherRoomLabels';
import { shortenedPriceWords } from '../../utils/helpers';

const DetailsBox = ({
  carpetArea,
  builtUpArea,
  superBuiltUpArea,
  price,
  pricePerSqFt,
  priceNegotiable,
  apartmentType,
  numBathrooms,
  numBalconies,
  otherRooms,
  location,
  landmark,
  taxAndGovtChargesExcluded,
  allInclusivePrice,
  furnishing,
  coveredParking,
  openParking,
  ageOfProperty,
  totalFloors
}) => {
  const theme = useTheme();

  return (
    <Grid
      item
      container
      sm={12}
      sx={{
        backgroundColor: lighten(theme.palette.primary.light, 0.9)
      }}>
      <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} sm={3}>
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
      <Grid xs={12} item sm={3}>
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
                {`Rs. ${shortenedPriceWords(price)}`}
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  marginLeft: 2,
                  color: 'text.secondary'
                }}>
                {`at Rs. ${pricePerSqFt} per sq.ft.`}
              </Typography>
              {taxAndGovtChargesExcluded && (
                <Typography
                  variant='body2'
                  sx={{
                    marginLeft: 2,
                    color: 'text.secondary'
                  }}>
                  + Tax &amp; Govt. charges extra
                </Typography>
              )}
              {allInclusivePrice && (
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
                {priceNegotiable ? '(Negotiable)' : '(Non-negotiable)'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid xs={12} item sm={3}>
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
      <Grid xs={12} item sm={3}>
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
      <Grid item xs={12} sm={3}>
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
      <Grid item xs={12} sm={3}>
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
              Total Floors
            </Typography>
            <Box sx={{ marginBottom: 1 }}>
              <Typography
                variant='body1'
                sx={{
                  marginLeft: 2,
                  color: 'text.primary'
                }}>
                {`${totalFloors} floors`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DetailsBox;
