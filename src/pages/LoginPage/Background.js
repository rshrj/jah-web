import { Grid, Box } from '@mui/material';

import backImg from '../../assets/images/login-back.jpg';

const Background = () => {
  return (
    <Grid item xs={0} sm={4} lg={6}>
      <Box
        sx={{
          width: '100%',
          height: `100vh`,
          backgroundImage: `url(${backImg})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      />
    </Grid>
  );
};

export default Background;
