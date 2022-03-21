import {
  Button,
  CardMedia,
  Container,
  Grid,
  Link,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import homeAdPlaceholder from '../../assets/images/homead-placeholder-2.png';
import backgroundVideo from '../../assets/videos/background.mp4';

import { getHomeAd } from '../../redux/slices/misc/miscSlice';

const Poster = styled(Grid)(({ theme }) => ({
  minHeight: '250px',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // backgroundImage: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    background: 'transparent',
    opacity: 0.8
  },
  '& > *': {
    zIndex: 100
  }
}));

const LandingHeader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHomeAd());
  }, [dispatch]);

  const homead = useSelector((state) => state.misc.homead);

  return (
    <Poster container>
      <Box
        sx={{
          position: 'absolute',
          top: '-92px',
          left: 0,
          width: '100%',
          height: '560px',
          backgroundColor: 'transparent',
          overflow: 'hidden',
          // opacity: ,
          zIndex: -1000,
          '&::after': {
            content: '""',
            position: 'absolute',
            display: 'block',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: -900
          }
        }}>
        <video
          autoPlay
          muted
          loop
          id='myVideo'
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '700px',
            zIndex: -10001,
            objectFit: 'cover',
            objectPosition: 'center',
            textAlign: 'center'
          }}>
          <source src={backgroundVideo} type='video/mp4' />
        </video>
      </Box>
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
          <Typography variant='h4' color='common.white' sx={{ maxWidth: 400 }}>
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
            {homead.image !== '' && (
              <CardMedia
                component='img'
                image={homead.image}
                sx={{ width: '260px', p: 3 }}
              />
            )}
          </Grid>
          <Grid
            item
            sx={{
              textAlign: { xs: 'center', sm: 'left' },
              position: 'relative'
            }}>
            <Typography variant='h4' color='common.white'>
              {homead.title}
            </Typography>
            <Typography sx={{ marginBottom: 1 }} color='common.white'>
              {homead.tagline}
            </Typography>
            {homead.buttonTitle !== '' && (
              <Button
                variant='contained'
                disableElevation
                component={Link}
                href={homead.buttonLink}
                target='_blank'
                rel='noopener noreferrer'>
                {homead.buttonTitle}
              </Button>
            )}
          </Grid>
        </Box>
      </Container>
    </Poster>
  );
};

export default LandingHeader;
