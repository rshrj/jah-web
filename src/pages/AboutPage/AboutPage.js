import { Container, Paper, Typography, useMediaQuery } from '@mui/material';
import { Box, useTheme } from '@mui/system';

import about0 from '../../assets/images/Vijay-1.jpg';
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
            height: isPhone ? 'auto' : 330
          }}
          alt='abc'
        />
      </Box>
    </Paper>
  );
};

const AboutPage = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery((theme) => theme.breakpoints.down('sm'));
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
            10,000 happy customers for the past 18 years. We are an exclusive
            mandate stalwart team formulated by some of the best-known names in
            the real estate industry. We have a strong success story in all
            verticals from pre-sales, channel partners, marketing etc.
            (end-to-end real estate), across various market segments ranging
            from ultra luxury to affordable housing.
          </Typography>
        </Box>

        <Box
          sx={{
            py: 5
          }}>
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
                maxWidth: 650,
                marginBottom: { xs: 3, sm: 0 }
              }}>
              <Typography
                variant='subtitle'
                color='text.secondary'
                fontWeight='normal'
                sx={{ marginBottom: 0 }}>
                Founder
              </Typography>
              <Typography
                variant='h5'
                color='primary.main'
                fontWeight='bold'
                sx={{ marginBottom: 2, marginTop: 0, paddingTop: 0 }}>
                Vijay Mishra
              </Typography>
              <Typography>
                Vijay is an acclaimed high-touch partner with a piece of
                extensive market knowledge for excellent customer service,
                devotion to clients, and a commitment to work hard, listen and
                follow through. He is fond of the real estate business and has
                been a full-time realtor since the start of his career for the
                last eighteen years. With an exemplary record in providing
                quality service to build relationships with clients, he
                maintains those relationships by communicating effectively. He
                is also the founder of Jai Ambe Homes and has served over
                10,000+ customers.
              </Typography>
            </Box>
            <Box>
              <img
                src={about0}
                style={{
                  width: isPhone ? '100%' : 500,
                  height: isPhone ? 'auto' : 330
                }}
                alt='abc'
              />
            </Box>
          </Paper>
          <AboutCard
            title='Vision: Dynamic Business Transformation In Real Estate'
            text='At Jai Ambe Advisory, we envision to build a ecosystem where both customers and sellers are happy. We guarantee the perfect fit of homes for our customers and quick sales for the sellers enlisted with us. We envision to be the pioneers in the Exclusive Mandate marketplace as a first-choice preferred partner for all top-notch developers. We will be the catalyst enabling the real estate business to move from traditional sales to the Exclusive Mandate business.'
            picture={about1}
          />
          <AboutCard
            title='Mission: Continuous Excellence With Inspired Action'
            text='We will leave no stone unturned in ensuring successful sales in each of our Exclusive Mandate projects while operating in any of the Real Estate segments, and strive for continuous excellence in our People, System & Processes. We seek a relationship that is not centered on a transaction, but rather an investment in each other’s success.'
            picture={about2}
          />
          <AboutCard
            title='Expect the best from us'
            text='Trust is the foremost foundation of our consulting firm and we ensure that all the parties involved get the best service possible. We look out for the interests of home buyers and tenants who choose to deal with us. Our 2000+ channel partners aggressively promote for us due to better returns. At Jai Ambe Advisory, there is no cost to you – just all the perks of being a seller through our network.'
            picture={about3}
          />
          <AboutCard
            title='Sole Mandate'
            text={
              <>
                <p>
                  Our 360° approach to project sales with generating leads,
                  prospecting them, closing them, ensuring loan approval, and
                  guiding throughout stamp duty and registration process helps
                  us achieve a sold-out tag quickly. Reach out to us to give
                  sole mandate to your project now. Our four key strengths are:
                </p>
                <ul>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Sourcing</span>:
                    Activating Channel Partners
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Pre-sales</span>:
                    Collaborative Communication
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Telecallers</span>:
                    Proactive Communication
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Closing Managers</span>
                    : High Conversion Ratio
                  </li>
                </ul>
              </>
            }
            picture={about4}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default AboutPage;
