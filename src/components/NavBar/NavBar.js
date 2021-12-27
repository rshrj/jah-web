import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { FaBars, FaPlus, FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { logout } from '../../redux/slices/auth/authSlice';

import { stringAvatar } from '../../utils/avatars';

import Logo from '../Logo';

const pages = [
  { name: 'For Buyers', link: '/forbuyers' },
  { name: 'For Tenants', link: '/fortenants' },
  { name: 'About', link: '/about' },
  { name: 'Contact Us', link: '/contactus' }
];

// TODO: Change settings pages

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1)
  // '@media all': {
  //   minHeight: 50
  // }
}));

const settings = [
  {
    label: 'Logout',
    action: (dispatch) => {
      dispatch(logout());
    }
  }
];

// Get login info from Redux
const NavBar = ({ loggedIn }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // TODO: Change Navbar behavior
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (action) => () => {
    action(dispatch);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: theme.palette.common.white
      }}
      elevation={0}>
      <Container maxWidth='xl'>
        <StyledToolbar disableGutters>
          {/* <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            LOGO
          </Typography> */}
          <StyledToolbar
            component={RouterLink}
            to='/'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Logo size={40} />
          </StyledToolbar>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
              sx={{ color: 'text.secondary' }}>
              <FaBars />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={RouterLink}
                    to={page.link}
                    variant='body'
                    sx={{
                      textDecoration: 'none',
                      color: 'text.primary'
                    }}
                    textAlign='center'>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            LOGO
          </Typography> */}
          <StyledToolbar
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            component={RouterLink}
            to='/'>
            <Logo size={60} />
          </StyledToolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.link}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1,
                  my: 0,
                  color: 'text.secondary',
                  fontWeight: 'bold',
                  display: 'block'
                }}>
                {page.name}
              </Button>
            ))}
          </Box>

          {loggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Tooltip title='New property'>
                  <IconButton color='primary' sx={{ mx: 3 }}>
                    <FaPlus />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                <Tooltip title='New property'>
                  <Button
                    variant='text'
                    startIcon={<FaPlus />}
                    sx={{
                      mx: 5,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: 'none'
                      }
                    }}>
                    New property
                  </Button>
                </Tooltip>
              </Box>
              {/* TODO: Handle logged in case */}
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    {...stringAvatar('Rishi Raj')}
                    src='/static/images/avatar/2.jpg'
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={handleCloseNavMenu(setting.action)}>
                    <Typography textAlign='center'>{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: { xs: 'inline-block', md: 'none' } }}>
                <Tooltip title='Login'>
                  <IconButton
                    component={RouterLink}
                    to='/login'
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 'bold'
                    }}>
                    <FaSignInAlt />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                <Tooltip title='Login'>
                  <Button
                    variant='text'
                    component={RouterLink}
                    to='/login'
                    startIcon={<FaSignInAlt />}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 'bold'
                    }}>
                    Login
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          )}
        </StyledToolbar>
      </Container>

      <Divider />
    </AppBar>
  );
};

export default NavBar;
