import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  LinearProgress,
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
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { logout } from '../../redux/slices/auth/authSlice';

import { stringAvatar } from '../../utils/avatars';

import Logo from '../Logo';

import { adminPages, customerPages } from '../Sidebar/Sidebar';

const pages = [
  { name: 'For Buyers', link: '/forbuyers' },
  { name: 'For Tenants', link: '/fortenants' },
  { name: 'About', link: '/about' },
  { name: 'Testimonials', link: '/submittestimonial' },
  { name: 'Contact Us', link: '/contact' }
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
    label: 'Dashboard',
    action: (_, navigate) => {
      navigate('/dashboard');
    }
  },
  {
    label: 'Logout',
    action: (dispatch, _) => {
      dispatch(logout());
    }
  }
];

// Get login info from Redux
const NavBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    if (!action) {
      setAnchorElNav(null);
      return;
    }
    action(dispatch, navigate);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const topLoading = useSelector((state) => state.misc.topLoading);

  const transparent = useSelector((state) => state.settings.transparent);

  const loggedIn = useSelector((state) => state.auth.loading === 'loggedIn');
  const name = useSelector((state) => state.auth.user?.name);
  const role = useSelector((state) => state.auth.user?.role);

  const sidebarPages = role === 'ADMIN' ? adminPages : customerPages;
  let sidebarActions = [
    { id: -1, name: 'New listing', icon: FaPlus, to: '/dashboard/newlisting' }
  ];

  return (
    <>
      {topLoading && (
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10000 }}>
          <LinearProgress color='primary' />
        </Box>
      )}

      <AppBar
        position='sticky'
        sx={{
          backgroundColor: transparent
            ? 'transparent'
            : theme.palette.common.white
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
              <Logo
                size={60}
                transparent={transparent}
                sx={{ position: 'relative', zIndex: 1000000 }}
              />
            </StyledToolbar>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
                sx={{ color: transparent ? 'white' : 'text.secondary' }}>
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
                onClose={handleCloseNavMenu(null)}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}>
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu(null)}>
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
                <Divider />
                {sidebarPages.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu(null)}>
                    <Typography
                      component={RouterLink}
                      to={page.to}
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
                <Divider />
                {sidebarActions.map((page) => (
                  <MenuItem key={page.id} onClick={handleCloseNavMenu(null)}>
                    <Typography
                      component={RouterLink}
                      to={page.to}
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
              <Logo
                size={50}
                transparent={transparent}
                sx={{ position: 'relative', zIndex: 1000000 }}
              />
            </StyledToolbar>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.link}
                  onClick={handleCloseNavMenu(null)}
                  sx={{
                    mx: 1,
                    my: 0,
                    color: transparent ? 'white' : 'text.secondary',
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
                  <Tooltip title='New listing'>
                    <IconButton
                      component={RouterLink}
                      to={'/dashboard/newlisting'}
                      sx={{
                        mx: 3,
                        color: transparent ? 'white' : 'primary.main'
                      }}>
                      <FaPlus />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  <Tooltip title='New listing'>
                    <Button
                      component={RouterLink}
                      to={'/dashboard/newlisting'}
                      variant='text'
                      startIcon={<FaPlus />}
                      sx={{
                        mx: 5,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: 'none'
                        },
                        color: transparent ? 'white' : 'primary.main'
                      }}>
                      New listing
                    </Button>
                  </Tooltip>
                </Box>
                {/* TODO: Handle logged in case */}
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar {...stringAvatar(`${name.first} ${name.last}`)} />
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
                      <Typography textAlign='center'>
                        {setting.label}
                      </Typography>
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
                        color: transparent ? 'white' : 'text.secondary',
                        fontWeight: 'bold'
                      }}>
                      <FaSignInAlt />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  <Tooltip title='New listing'>
                    <Button
                      component={RouterLink}
                      to={'/signup'}
                      variant='text'
                      startIcon={<FaPlus />}
                      sx={{
                        mx: 5,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: 'none'
                        },
                        color: transparent ? 'white' : 'primary.main'
                      }}>
                      New listing
                    </Button>
                  </Tooltip>
                  <Tooltip title='Login'>
                    <Button
                      variant='text'
                      component={RouterLink}
                      to='/login'
                      startIcon={<FaSignInAlt />}
                      sx={{
                        color: transparent ? 'white' : 'text.secondary',
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
    </>
  );
};

export default NavBar;
