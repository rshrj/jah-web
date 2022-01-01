import { Container, Paper, Typography, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';

import about1 from '../../assets/images/holistic-real-estate-deals.png';
import about2 from '../../assets/images/consultancy-services.png';
import about3 from '../../assets/images/trusted-realtor.png';
import about4 from '../../assets/images/sole-mandate.png';
import Footer from '../../components/Footer';

const AboutCard = ({ title, text, picture }) => {
  const theme = useTheme();
  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
        px: 3,
        py: 3,
        my: 4,
        '&:nth-of-type(2n)': {
          flexDirection: { xs: 'column', sm: 'row-reverse' },
          borderLeft: `none`,
          borderRight: `0px solid ${theme.palette.primary.main}`,
          '&:hover': {
            transform: 'scale(1.01)',
            borderRightWidth: '5px',
            cursor: 'pointer'
          }
        },
        boxShadow: '0px 0px 38px -20px rgba(0,0,0,0.40)',
        transition: '0.3s ease',
        borderLeft: `0px solid ${theme.palette.primary.main}`,
        '&:hover': {
          transform: 'scale(1.01)',
          borderLeftWidth: '5px',
          cursor: 'pointer'
        }
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 450,
          marginBottom: { xs: 3, sm: 0 }
        }}>
        <Typography
          variant='h5'
          color='primary.main'
          fontWeight='bold'
          sx={{ marginBottom: 2 }}>
          {title}
        </Typography>
        <Typography>{text}</Typography>
      </Box>
      <Box>
        <img
          src={picture}
          style={{
            width: isPhone ? '100%' : 500,
            height: isPhone ? 'auto' : 333
          }}
          alt='abc'
        />
      </Box>
    </Paper>
  );
};

const AboutPage = () => {
  return (
    <>
      <Container maxWidth='lg'>
        <Box sx={{ pt: 4 }}>
          <Typography
            variant='h3'
            color='primary.main'
            align='center'
            sx={{ marginBottom: 3 }}>
            Get Homes Sold Fast
          </Typography>
          <Typography
            variant='body1'
            color='text.secondary'
            align='center'
            sx={{ px: { xs: 0, sm: 15 } }}>
            With our lead database of over 50,000 people we have served over
            10,000 happy customers for the past 21 years.
          </Typography>
        </Box>

        <Box
          sx={{
            py: 5
          }}>
          <AboutCard
            title='Vision: Holistic Real Estate Deals'
            text='At Jai Ambe Real Estate Consultants, we envision to build a ecosystem
          where both customers and sellers are happy. We guarantee the perfect
          fit of homes for our customers and quick sales for the sellers
          enlisted with us.'
            picture={about1}
          />
          <AboutCard
            title='Consultation Services'
            text='We work with you closely from the time you contact us to the time you move in and help you with all the paperwork, real estate jargon and financing options. You can bid goodbye to your real estate woes with us.'
            picture={about2}
          />
          <AboutCard
            title='Trusted Realtor'
            text='Trust is the foremost foundation of our consulting firm and we ensure that all the parties involved get the best service possible. We look out for the interests of home buyers and tenants who choose to deal with us.'
            picture={about3}
          />
          <AboutCard
            title='Sole Mandate'
            text='Our 360° approach to project sales with generating leads, prospecting them, closing them, ensuring loan approval, and guiding throughout stamp duty and registration process helps us achieve a sold-out tag quickly. Reach out to us to give sole mandate to your project now.'
            picture={about4}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
