import {
  Avatar,
  Collapse,
  Divider,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Slide,
  Typography
} from '@mui/material';
import {
  FaBell,
  FaCheck,
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaList,
  FaUser,
  FaPlus
} from 'react-icons/fa';
import { Box } from '@mui/system';
import { useTheme, lighten } from '@mui/material/styles';
import { useState } from 'react';
import { TransitionGroup } from 'react-transition-group';

import { stringAvatar } from '../../utils/avatars';

const dashboardPages = [
  { id: 1, name: 'Listings', icon: FaList },
  { id: 2, name: 'Testimonials', icon: FaCheck },
  { id: 3, name: 'Home Ad', icon: FaBell },
  { id: 4, name: 'User', icon: FaUser },
  {id:5,name:'New Property',icon:FaPlus}
];

const Sidebar = () => {
  const theme = useTheme();

  const [selectedTab, setSelectedTab] = useState(1);
  const [collapsed, setCollapsed] = useState(false);

  const handleSidebarCollapseClick = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuItemClick = (id) => (event) => {
    event.preventDefault();

    setSelectedTab(id);
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
    <TransitionGroup>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'inline-flex'
          },
          position: 'sticky',
          top: 80,
          width: {
            md: collapsed ? 100 : 200,
            lg: collapsed ? 100 : 300
          }
        }}>
        <Box
          sx={{
            width: {
              md: collapsed ? 100 : 200,
              lg: collapsed ? 100 : 300
            },
            height: `calc(100vh - 80px)`,
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
            {collapsed ? (
              <FaChevronCircleRight fontSize={30} />
            ) : (
              <FaChevronCircleLeft fontSize={30} />
            )}
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
                {!collapsed && <ListItemText>{page.name}</ListItemText>}
              </MenuItem>
            ))}
          </MenuList>
        </Box>

        <Divider orientation='vertical' flexItem />
      </Box>
    </TransitionGroup>
  );
};

export default Sidebar;
