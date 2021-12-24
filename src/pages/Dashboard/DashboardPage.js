import {
  Avatar,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography
} from '@mui/material';
import { FaBell, FaCheck, FaList, FaUser } from 'react-icons/fa';
import { lighten, useTheme } from '@mui/material/styles';

import NavBar from '../../components/NavBar';
import { stringAvatar } from '../../utils/avatars';
import { useState } from 'react';
import { Box } from '@mui/system';

const dashboardPages = [
  { id: 1, name: 'Listings', icon: FaList },
  { id: 2, name: 'Testimonials', icon: FaCheck },
  { id: 3, name: 'Home Ad', icon: FaBell },
  { id: 4, name: 'User', icon: FaUser }
];

const DashboardPage = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);

  const handleMenuItemClick = (id) => (event) => {
    event.preventDefault();

    setSelectedTab(id);
  };

  const styledMenu = {
    normal: {
      py: 1.5,
      px: { xs: 2, md: 2, lg: 6 },
      '&:hover': {
        color: lighten(theme.palette.primary.light, 0)
      },
      m: 1,
      transition: '0.2s ease',
      transitionProperty: 'background-color color',
      borderRadius: 10
    },
    selected: {
      py: 1.5,
      px: { xs: 2, md: 2, lg: 6 },
      '&:hover': {
        backgroundColor: lighten(theme.palette.primary.light, 0.8),
        color: theme.palette.primary.main
      },
      m: 1,
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: lighten(theme.palette.primary.light, 0),
      transition: '0.2s ease',
      transitionProperty: 'background-color color',
      borderRadius: 10
    }
  };

  return (
    <>
      <NavBar loggedIn={true} />
      {/* <Container maxWidth='xl'> */}
      <Divider />
      <Grid container>
        <Grid item xs={0} md={2}>
          <Paper
            sx={{
              width: '100%',
              height: `calc(100vh - 80px)`,
              paddingTop: 10,
              display: {
                xs: 'none',
                md: 'block'
              }
            }}
            elevation={0}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
                py: 2,
                mx: {
                  xs: 2,
                  md: 2,
                  lg: 6
                },
                marginBottom: 2,
                backgroundColor: 'grey.50',
                borderRadius: 10
              }}
              elevation={0}>
              <Avatar
                {...stringAvatar('Rishi Raj')}
                src='/static/images/avatar/2.jpg'
              />
              <Typography
                variant='subtitle1'
                color='grey.600'
                sx={{ marginTop: 1 }}>
                Welcome back, Rishi
              </Typography>
            </Box>
            <MenuList>
              {dashboardPages.map((page) => (
                <MenuItem
                  sx={
                    page.id === selectedTab
                      ? styledMenu.selected
                      : styledMenu.normal
                  }
                  onClick={handleMenuItemClick(page.id)}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    {<page.icon />}
                  </ListItemIcon>
                  <ListItemText>{page.name}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Grid>
        <Divider orientation='vertical' flexItem sx={{ marginRight: '-1px' }} />
        <Grid item container xs={12} md={10}>
          <Paper
            sx={{
              my: 0,
              mx: { xs: 0, md: 2 },
              p: { xs: 4, md: 10 },
              width: '100%',
              height: `calc(100vh - 150px)`,
              backgroundColor: theme.palette.common.white,
              // backgroundColor: lighten(theme.palette.grey[50],
              borderRadius: 5
            }}
            elevation={0}>
            <Breadcrumbs aria-label='breadcrumb'>
              <Link underline='hover' color='inherit' href='/'>
                MUI
              </Link>
              <Link
                underline='hover'
                color='inherit'
                href='/getting-started/installation/'>
                Core
              </Link>
              <Typography color='text.primary'>Breadcrumbs</Typography>
            </Breadcrumbs>
            <Typography variant='h3' color='text.primary'>
              Active listings
              {/* <Box
                sx={{ width: '100%', height: 1000, backgroundColor: 'orange' }}
              /> */}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {/* </Container> */}
    </>
  );
};

export default DashboardPage;
