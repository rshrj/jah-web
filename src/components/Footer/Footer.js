import React from 'react';

import { Box, Link, Grid, Divider } from '@mui/material';
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
  justify-content: space-between;
`;
const Content = styled.div`
  width: 281px;
  color: #828282;
  font-size: 16px;
  letter-spacing: 0.15px;
`;

const icons = [
  {
    icon: <FaFacebook size={30} />,
    link: ''
  },
  {
    icon: (
      <Icon>
        <FaInstagram />
      </Icon>
    ),
    link: ''
  },
  {
    icon: (
      <Icon>
        <FaTwitter />
      </Icon>
    ),
    link: ''
  },
  {
    icon: (
      <Icon>
        <FaLinkedinIn />
      </Icon>
    ),
    link: ''
  }
];

const Footer = () => {
  const Icons = icons.map((m, i) => (
    <Link href={m.link} sx={{ color: 'black' }} underline='none' key={i}>
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
                display: 'flex',
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
            backgroundColor: '#E85D04',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '12px'
          }}>
          Created with love &nbsp;<span style={{ color: 'red' }}>♥</span> &nbsp;
          by Zenoholics. © 2021 All Rights Reserved
        </Box>
      </Box>
    </>
  );
};

export default Footer;
