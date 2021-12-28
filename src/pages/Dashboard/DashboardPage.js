import {
  Breadcrumbs,
  Button,
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
import { FaAngleRight, FaArrowLeft,FaSearch} from 'react-icons/fa';
import { withStyles } from "@material-ui/core/styles";

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        {loading ?(
          <>
          <Skeleton sx={{width:150, height:90}} style={{marginLeft:45, borderRadius:20,marginTop:100}} animation="wave" variant="rectangular" />
          <Skeleton sx={{ height: 300,width:200 }} style={{marginTop:20,borderRadius:10,marginLeft:20}} animation="wave" variant="rectangular" />
          </>
        ):(
          <Sidebar />
        )}
        </Box>
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
          <Box>
          {loading?(
            <Skeleton animation="wave" height={90} width="25%" style={{marginLeft:20}} />
          ):(
            <Typography variant="h4">Active Listings</Typography>
          )}
            {/* <TextField
            // sx={{width:282,height:11}}
            placeholder='Search'
            InputProps={{
              classes: { input: props.classes.input },
            endAdornment: (
            <FaSearch />
          ),
          }}/> */}
          </Box>
          <Box>
          {loading?(
            <Skeleton sx={{ height: 400,width:1100 }} style={{marginTop:10,borderRadius:10,marginLeft:20}} animation="wave" variant="rectangular" />
          ):(
            <Table/>
          )}
          </Box>
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
      <StyledDashboard loading/>
      <StyledDashboard/>
    </>
  )
}