import { useTheme } from '@mui/material/styles';
import { css } from '@emotion/react';
import { Box } from '@mui/system';
import { HashLoader } from 'react-spinners';

import Logo from '../Logo';

const SplashScreen = () => {
  const theme = useTheme();

  const override = css`
    display: block;
    margin: 100px;
  `;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.grey[0]
      }}>
      <Logo size={100} />
      <HashLoader
        color={theme.palette.primary.main}
        css={override}
        size={150}
      />
    </Box>
  );
};

export default SplashScreen;
