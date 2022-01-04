import {
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaTimes } from 'react-icons/fa';
import { format } from 'date-fns';
import { MdPlayArrow } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { shortenedPriceWords } from '../../utils/helpers';
import unitLabels from '../../constants/unitLabels';
import contactInfo from '../../constants/contactInfo.json';
import { ChipOption, ChipSelect } from '../../components/ChipSelect';
import DetailsBox from './DetailsBox';

const sortTypes = (types) => {
  const allTypesInOrder = ['1rk', '1bhk', '2bhk', '3bhk', '4bhk'];
  const sortFunc = (type1, type2) => {
    return allTypesInOrder.indexOf(type1) - allTypesInOrder.indexOf(type2);
  };

  return types.slice().sort(sortFunc);
};

const SellProjectView = ({ listing, name }) => {
  const theme = useTheme();
  const {
    location,
    landmark,
    apartmentTypes,
    units,
    coveredParking,
    openParking,
    totalFloors,
    ageOfProperty,
    availabilityStatus,
    possessionBy,
    ownershipType,
    usp,
    pictures,
    featuredPicture,
    videoLink,
    brochureLink
  } = listing;

  let typesSorted = sortTypes(apartmentTypes);

  let [backdropShown, setBackdropShown] = useState(false);
  let [enabledType, setEnabledType] = useState(typesSorted[0]);

  const handleTypesToggle = (event, newval) => {
    setEnabledType(newval);
  };

  const handleGalleryClick = (e) => {
    e.preventDefault();

    setBackdropShown(true);
  };

  const handleCloseBackdrop = (e) => {
    setBackdropShown(false);
  };

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

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
                {name}
              </Typography>
              <Typography
                variant='subtitle1'
                sx={{
                  fontWeight: 'normal',
                  marginBottom: 1,
                  color: 'text.secondary'
                }}
                component='div'>
                {`${typesSorted
                  .map((type) => unitLabels[type])
                  .join(', ')} for sale in ${location}`}
              </Typography>
              <Chip variant='outlined' color='primary' label='Homes for sale' />
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
                    variant='subtitle1'
                    sx={{
                      marginBottom: 1,
                      display: 'inline-block',
                      marginRight: 1,
                      color: 'text.secondary'
                    }}
                    component='div'>
                    {`Starting from`}
                  </Typography>
                </Box>
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
                    {shortenedPriceWords(
                      Math.min(...typesSorted.map((type) => units[type].price))
                    )}
                  </Typography>
                </Box>
                {/* <Box>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      marginBottom: 1,
                      display: 'inline-block',
                      marginRight: 1,
                      color: 'text.secondary'
                    }}
                    component='div'>
                    {`@ ${pricePerSqFt} per sq.ft.`}
                  </Typography>
                </Box> */}
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

        <Grid container sx={{ mt: 2, px: 2 }}>
          <Grid item sm={6}>
            <Typography
              variant='subtitle1'
              sx={{
                display: 'inline-block',
                color: 'text.secondary',
                marginRight: 2
              }}>
              Availability Status:
            </Typography>
            <Typography
              variant='body1'
              sx={{ display: 'inline-block', color: 'text.primary' }}>
              {availabilityStatus === 'underConstruction'
                ? 'Under Construction,'
                : 'Ready to move'}
            </Typography>{' '}
            {availabilityStatus === 'underConstruction' && (
              <Typography
                variant='body1'
                sx={{ display: 'inline-block', color: 'text.primary' }}>
                {`Possession by ${format(new Date(possessionBy), 'MMM, yyyy')}`}
              </Typography>
            )}
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant='subtitle1'
              sx={{
                display: 'inline-block',
                color: 'text.secondary',
                marginRight: 2
              }}>
              Ownership Type:
            </Typography>
            <Typography
              variant='body1'
              sx={{ display: 'inline-block', color: 'text.primary' }}>
              {ownershipType === 'freehold' && 'Freehold'}
              {ownershipType === 'leasehold' && 'Leasehold'}
              {ownershipType === 'cooperativeSociety' && 'Cooperative Society'}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sm={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isPhone ? 'center' : 'flex-start',
            mt: 2,
            paddingLeft: 0
          }}>
          {/* <Box sx={{ marginLeft: 2 }}>
            <Typography variant='h5' color='primary.main' component='div'>
              Type of units
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ mt: 0 }}
              component='div'>
              (Click to see specifications)
            </Typography>
          </Box> */}

          {/* <ChipSelect
            value={enabledTypes}
            onChange={handleTypesToggle}
            sx={{ marginLeft: 2 }}>
            {typesSorted.map((type) => (
              <ChipOption
                value={type}
                label={unitLabels[type]}
                marginBottom={0}
                variant='contained'
              />
            ))}
          </ChipSelect> */}

          <ToggleButtonGroup
            orientation={isPhone ? 'vertical' : 'horizontal'}
            value={enabledType}
            color='primary'
            exclusive
            onChange={handleTypesToggle}
            sx={{
              textDecoration: 'none',
              width: '100%'
            }}>
            {typesSorted.map((type) => (
              <ToggleButton value={type} key={type} aria-label='sell project'>
                <Box
                  sx={{
                    display: 'inline-flex',
                    justiftContent: 'center',
                    alignItems: 'center',
                    textDecoration: 'none',
                    px: { xs: 7, md: 4 }
                  }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      justiftContent: 'center',
                      alignItems: 'center',
                      textDecoration: 'none',
                      marginLeft: 2
                    }}>
                    <Typography>{unitLabels[type]}</Typography>
                  </Box>
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Grid>

        {enabledType && (
          <DetailsBox
            {...units[enabledType]}
            {...{
              location,
              landmark,
              coveredParking,
              openParking,
              ageOfProperty,
              totalFloors
            }}
            apartmentType={enabledType}
          />
        )}
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Typography variant='h5' color='text.primary'>
          Project brochure
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
          <Button
            href={brochureLink}
            target='_blank'
            rel='noopener noreferrer'
            underline='hover'
            component={Link}
            variant='outlined'>
            Click to download
          </Button>
        </Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant='h5' color='text.primary'>
          Why should you buy this property?
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
          {usp}
        </Typography>
      </Box>
    </>
  );
};

export default SellProjectView;
