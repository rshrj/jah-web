import {
  Breadcrumbs,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
  Skeleton
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

import {
  Outlet,
  Link as RouterLink,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { FaAngleRight, FaArrowLeft,FaSearch} from 'react-icons/fa';
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from '@mui/material/InputAdornment';

import NavBar from '../../components/NavBar';
import Sidebar from '../../components/Sidebar';
import Table from './Table';

const styles = {
  input: {
    height: 10
  }
};
function Dashboard(props) {
  const {loading=false} =props;
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  let routenames = location.pathname.split('/').filter((route) => route !== '');
  let routes = Array.from(routenames.entries()).map(([index, routename]) => ({
    name: routename,
    to: `/${routenames.slice(0, index + 1).join('/')}`
  }));

  const handleBackClick = (e) => {
    navigate(-1);
  };

  console.log(routes);

  return (
    <>
      {/* <Box>
        {loading ? (
          <>
            <Skeleton variant="circular" animation="wave" height={50} width={50} style={{marginLeft:40,marginTop:20}}/>
            <Skeleton width="15%" height={10} style={{marginLeft:20}} animation="wave" />
          </>
        ):(
          <NavBar loggedIn={true} />
        )}
      </Box> */}
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
            <IconButton onClick={handleBackClick}>
              <FaArrowLeft />
            </IconButton>
            <Breadcrumbs
              aria-label='breadcrumb'
              sx={{ m: 1 }}
              separator={<FaAngleRight />}>
              {routes.slice(0, -1).map((route) => (
                <Link
                  key={route.name}
                  component={RouterLink}
                  underline='hover'
                  color='inherit'
                  to={route.to}>
                  {route.name}
                </Link>
              ))}
              <Typography color='text.primary'>{routes.at(-1).name}</Typography>
            </Breadcrumbs>
            <Typography variant='h4'>Active Listings</Typography>
            <TextField
              placeholder="Search"
              size="small"
              InputProps={{
              startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
            />
          </Box>
          <Outlet />
          <Table/>
        </Box>
      </Box>
    </>
  );
};

Dashboard.propTypes={
  loading:PropTypes.bool,
}
const StyledDashboard = withStyles(styles)(Dashboard);
export default function DashboardPage(){
  return(
    <>
      {/* <StyledDashboard loading/> */}
      <StyledDashboard/>
    </>
  )
}