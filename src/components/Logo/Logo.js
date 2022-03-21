import { Box } from '@mui/system';

import whiteLogo from '../../assets/images/logo/logo-white.png';
import blackLogo from '../../assets/images/logo/logo-black.png';

const Logo = ({ size, transparent = false, ...sx }) => {
  return (
    <Box
      component='div'
      sx={{
        width: 2.9 * size,
        height: size,
        ...sx
      }}>
      <img
        src={transparent ? blackLogo : whiteLogo}
        style={{ width: '100%', height: '100%' }}
        alt='Jai Ambe Advisory'
      />
    </Box>
  );
};

export default Logo;
