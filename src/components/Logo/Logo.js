import { Box } from '@mui/system';

import logoVector from '../../assets/vectors/logo-noshadow.svg';

const Logo = ({ size, ...sx }) => {
  return (
    <Box
      component='div'
      sx={{
        width: 2.9 * size,
        height: size,
        backgroundImage: `url(${logoVector})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        ...sx
      }}
    />
  );
};

export default Logo;
