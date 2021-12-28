import {
  Breadcrumbs,
  IconButton,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';

const DashboardPage = () => {
  const theme = useTheme();
  const location = useLocation();

  let routes = location.pathname.split('/').filter((route) => route !== '');

  return (
    <>
      <NavBar loggedIn={true} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <Sidebar />

        <Box
          sx={{
            my: 0,
            mx: { xs: 0, md: 2 },
            px: { xs: 2, md: 2, lg: 6 },
            py: { xs: 2, md: 2, lg: 3 },
            width: '100%',
            backgroundColor: theme.palette.common.white,
            // backgroundColor: lighten(theme.palette.grey[50],
            borderRadius: 5
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <FaArrowLeft />
            </IconButton>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ m: 1 }}
              separator={<FaAngleRight />}>
              {routes.slice(0, -1).map((route) => (
                <Link
                  key={route}
                  component={RouterLink}
                  underline='hover'
                  color='inherit'
                  to='/'>
                  {route}
                </Link>
              ))}
              <Typography color='text.primary'>{routes.at(-1)}</Typography>
            </Breadcrumbs>
          </Box>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
