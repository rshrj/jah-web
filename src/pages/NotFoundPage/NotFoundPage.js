import { Container, Grid, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';

import notFoundIllustration from '../../assets/vectors/not-found-illustration.svg';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar';

const NotFoundPage = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            404 Error
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            align='center'
            sx={{ px: { xs: 0, sm: 15 } }}>
            We couldn’t find the page you were looking for. If you think this is
            a mistake, you can{' '}
            <Link to='/contact' component={RouterLink} underline='hover'>
              contact
            </Link>{' '}
            us.
          </Typography>
        </Box>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5
          }}>
          <Box
            sx={{
              width: 500,
              height: 500,
              backgroundImage: `url(${notFoundIllustration})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}></Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default NotFoundPage;
