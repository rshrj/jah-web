import { Avatar, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import { stringAvatar } from '../../utils/avatars';

const MyAccount = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ p: { xs: 0, md: 5 }, m: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar
          {...stringAvatar(`${user.name.first} ${user.name.last}`, {
            height: 100,
            width: 100,
            fontSize: 40,
            marginRight: 4
          })}
          src={user.avatar || ''}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4'>{`${user.name.first} ${user.name.last}`}</Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {user.email}
          </Typography>
          <Typography variant='body1' sx={{ color: 'text.secondary' }}>
            {user.phone}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MyAccount;
