import {
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Paper,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { FaAngleRight, FaArrowLeft } from 'react-icons/fa';

import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';

const DashboardPage = () => {
  const theme = useTheme();

  return (
    <>
      <NavBar loggedIn={true} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Sidebar />

        <Box
          sx={{
            my: 0,
            mx: { xs: 0, md: 2 },
            px: { xs: 2, md: 2, lg: 6 },
            py: { xs: 2, md: 2, lg: 3 },
            width: '100%',
            height: `calc(100vh - 150px)`,
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
              <Link underline='hover' color='inherit' href='/'>
                Listings
              </Link>
              <Typography color='text.primary'>New Property</Typography>
            </Breadcrumbs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
