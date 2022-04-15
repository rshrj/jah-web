import React from 'react';

import { Box, Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import Logo from '../Logo';
import styled from '@emotion/styled';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';

import contactInfo from '../../constants/contactInfo.json';

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid black;
  text-align: center;
  padding-top: 5px;
`;
const IconsWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Content = styled.div`
  width: 281px;
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: 16px;
  letter-spacing: 0.15px;
`;

const icons = [
  {
    icon: <FaFacebook size={30} />,
    link: 'https://www.facebook.com/Jai-Ambe-Advisory-Pvt-Ltd-100107012553389'
  },
  {
    icon: (
      <Icon>
        <FaInstagram />
      </Icon>
    ),
    link: 'https://www.instagram.com/jaiambeadvisorypvtltd'
  },
  {
    icon: (
      <Icon>
        <FaTwitter />
      </Icon>
    ),
    link: 'https://twitter.com/ambe_ltd'
  },
  {
    icon: (
      <Icon>
        <FaLinkedinIn />
      </Icon>
    ),
    link: 'https://www.linkedin.com/in/jai-ambe-advisory-private-limited-1a4676229'
  }
];

const Footer = () => {
  const Icons = icons.map((m, i) => (
    <Link href={m.link} sx={{ color: 'black', mx: 1 }} underline='none' key={i}>
      {m.icon}
    </Link>
  ));

  return (
    <>
      <Box
        sx={{
          pt: '50px',
          backgroundColor: 'white'
        }}>
        <Grid container spacing={2} sx={{ mb: '30px' }}>
          <Grid container item sx={{ width: { xs: '100%', md: '40%' } }}>
            <Grid
              item
              sx={{
                maxWidth: '281px',
                width: '100%',
                margin: 'auto',
                display: { sm: 'flex', xs: 'none' },
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
              <Logo size={60} />
            </Grid>
            <Grid
              item
              sx={{
                mt: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Content>
                We build relationships that last a lifetime and help you get the
                best real estate deals in Mumbai.
              </Content>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sx={{
              width: { xs: '100%', md: '60%' },
              textAlign: { xs: 'center', md: 'left' }
            }}>
            <Grid
              container
              item
              sx={{
                width: { xs: '100%', md: '33.33%' },
                mt: { xs: '20px', md: '0' }
              }}>
              <Grid item xs={12} sx={{ fontSize: '20px', mb: '10px' }}>
                Links
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/forbuyers?type=projects'
                  component={RouterLink}>
                  Projects
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/forbuyers?type=apartments'
                  component={RouterLink}>
                  Resale Homes
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/fortenants'
                  component={RouterLink}>
                  Rent/Lease
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                width: { xs: '100%', md: '33.33%' },
                mt: { xs: '20px', md: '0' }
              }}>
              <Grid item xs={12} sx={{ fontSize: '20px', mb: '10px' }}>
                Legal
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/tnc'
                  component={RouterLink}>
                  Terms &amp; Conditions
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/privacy'
                  component={RouterLink}>
                  Privacy Policy
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  to='/about'
                  component={RouterLink}>
                  About
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                width: { xs: '100%', md: '33.33%' },
                mt: { xs: '20px', md: '0' }
              }}>
              <Grid item xs={12} sx={{ fontSize: '20px', mb: '10px' }}>
                Contact
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  href={`tel:${contactInfo.phone}`}>
                  {contactInfo.phone}
                </Link>
              </Grid>
              <Grid item xs={12} sx={{ mt: '15px' }}>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    color: '#828282',
                    fontSize: '15px'
                  }}
                  href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  mt: '15px',
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}>
                <IconsWrapper>
                  {Icons}
                  {/* <FaFacebook size={30} />
                  <Icon>
                    <FaInstagram />
                  </Icon>
                  <Icon>
                    <FaTwitter />
                  </Icon>
                  <Icon>
                    <FaLinkedinIn />
                  </Icon> */}
                </IconsWrapper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box
          component='div'
          sx={{
            height: '30px',
            width: '100%',
            backgroundColor: 'grey.800',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: { xs: '8px', sm: '11px' },
            textWrapping: 'wrap'
          }}>
          Copyright &copy; {new Date().getFullYear()} | All Rights Reserved with Jai Ambe Advisory Pvt. Ltd.
        </Box>
      </Box>
    </>
  );
};

export default Footer;
