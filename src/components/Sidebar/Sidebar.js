import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography
} from '@mui/material';
import {
  FaBell,
  FaCheck,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaEllipsisV,
  FaList,
  FaPlus,
  FaUser
} from 'react-icons/fa';
import { Box } from '@mui/system';
import { useTheme, lighten } from '@mui/material/styles';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { stringAvatar } from '../../utils/avatars';
import { MdArrowLeft, MdArrowRight, MdMenu, MdMenuOpen } from 'react-icons/md';

export const adminPages = [
  { id: 1, name: 'Listings', icon: FaList, to: '/dashboard/listings' },
  { id: 2, name: 'Testimonials', icon: FaCheck, to: '/dashboard/testimonials' },
  { id: 3, name: 'Home Ad', icon: FaBell, to: '/dashboard/homead' },
  { id: 4, name: 'Users', icon: FaUser, to: '/dashboard/users' }
];

export const customerPages = [
  { id: 1, name: 'Listings', icon: FaList, to: '/dashboard/listings' },
  { id: 2, name: 'My Account', icon: FaUser, to: '/dashboard/myaccount' }
];

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  let currentPath = location.pathname;

  const role = useSelector((state) => state.auth.user.role);

  let pages = role === 'ADMIN' ? adminPages : customerPages;
  let pagesBottom = [
    { id: -1, name: 'New listing', icon: FaPlus, to: '/dashboard/newlisting' }
  ];
  let selectedTab =
    pages.find((page) => page.to === currentPath)?.id ||
    pagesBottom.find((page) => page.to === currentPath)?.id ||
    1;

  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarCollapseClick = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (id) => (event) => {
    event.preventDefault();

    let page = pages.find((p) => p.id === id);
    navigate(page.to, { state: { from: location } });
  };
  const handleMenuBottomItemClick = (id) => (event) => {
    event.preventDefault();

    let page = pagesBottom.find((p) => p.id === id);
    navigate(page.to, { state: { from: location } });
  };

  const styledMenu = {
    normal: {
      py: 1.5,
      px: {
        xs: collapsed ? 0 : 2,
        md: collapsed ? 0 : 4,
        lg: collapsed ? 0 : 6
      },
      '&:hover': {
        color: lighten(theme.palette.primary.light, 0)
      },
      my: 1,
      mx: collapsed ? 2 : 1,
      transition: '0.2s ease',
      transitionProperty: 'background-color color',
      borderRadius: 10,
      justifyContent: 'center'
    },
    selected: {
      py: 1.5,
      px: {
        xs: collapsed ? 0 : 2,
        md: collapsed ? 0 : 4,
        lg: collapsed ? 0 : 6
      },
      my: 1,
      mx: collapsed ? 2 : 1,
      transition: '0.2s ease',
      transitionProperty: 'background-color color',
      borderRadius: 10,
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: lighten(theme.palette.primary.light, 0.8),
        color: theme.palette.primary.main
      },
      backgroundColor: lighten(theme.palette.primary.light, 0.9),
      color: lighten(theme.palette.primary.light, 0)
    }
  };

  return (
    <Box
      sx={{
        display: {
          xs: 'none',
          md: 'inline-flex'
        },
        width: {
          md: collapsed ? 100 : 200,
          lg: collapsed ? 100 : 300
        },
        height: 'calc(100vh - 80px)',
        position: 'sticky',
        top: 80
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
        <Box
          sx={{
            width: {
              md: collapsed ? 100 : 200,
              lg: collapsed ? 100 : 300
            },
            paddingTop: 10,
            display: {
              xs: 'none',
              md: 'inline-block'
            },
            transition: '0.2 ease',
            transitionProperty: 'width'
          }}>
          <IconButton
            sx={{
              color: 'grey.400',
              fontWeight: 'bold',
              float: 'right',
              mx: 1,
              my: -8,
              '&:hover': {
                backgroundColor: lighten(theme.palette.primary.light, 0.9),
                color: theme.palette.primary.light
              }
            }}
            onClick={handleSidebarCollapseClick}>
            {/* {collapsed ? (
            <FaChevronCircleRight fontSize={30} />
          ) : (
            <FaChevronCircleLeft fontSize={30} />
          )} */}
            {/* {collapsed ? (
            <MdArrowRight fontSize={20} />
          ) : (
            <MdArrowLeft fontSize={20} />
          )} */}
            {/* <MdArrowLeft fontSize={20} /> */}
            <MdMenuOpen fontSize={25} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: collapsed ? 0 : 2,
              py: 2,
              mx: {
                xs: 2,
                md: 2,
                lg: 6
              },
              marginBottom: 2,
              backgroundColor: collapsed ? 'inherit' : 'grey.50',
              borderRadius: 10
            }}>
            <Avatar
              {...stringAvatar('Rishi Raj')}
              src='/static/images/avatar/2.jpg'
            />
            {!collapsed && (
              <Typography
                variant='subtitle1'
                color='grey.600'
                sx={{ marginTop: 1 }}>
                Welcome back, Rishi
              </Typography>
            )}
          </Box>
          <MenuList>
            {pages.map((page) => (
              <MenuItem
                key={page.id}
                sx={
                  page.id === selectedTab
                    ? styledMenu.selected
                    : styledMenu.normal
                }
                onClick={handleMenuItemClick(page.id)}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {<page.icon />}
                </ListItemIcon>
                {!collapsed && <ListItemText>{page.name}</ListItemText>}
              </MenuItem>
            ))}
          </MenuList>
        </Box>

        <Box
          sx={{
            width: {
              md: collapsed ? 100 : 200,
              lg: collapsed ? 100 : 300
            },
            paddingBottom: 2,
            display: {
              xs: 'none',
              md: 'inline-block'
            },
            transition: '0.2 ease',
            transitionProperty: 'width'
          }}>
          <Divider variant='middle' />
          <MenuList>
            {pagesBottom.map((page) => (
              <MenuItem
                key={page.id}
                sx={
                  page.id === selectedTab
                    ? styledMenu.selected
                    : styledMenu.normal
                }
                onClick={handleMenuBottomItemClick(page.id)}>
                <ListItemIcon sx={{ color: 'inherit' }}>
                  {<page.icon />}
                </ListItemIcon>
                {!collapsed && <ListItemText>{page.name}</ListItemText>}
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Box>

      <Divider orientation='vertical' flexItem />
    </Box>
  );

  let blah = (
    <Box
      sx={{
        position: 'sticky',
        top: 80,
        height: '100px',
        backgroundColor: 'pink'
      }}>
      abracadabra
    </Box>
  );
};

export default Sidebar;
