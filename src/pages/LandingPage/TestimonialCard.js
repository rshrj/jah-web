import { useTheme } from '@emotion/react';
import { Avatar, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FaQuoteLeft } from 'react-icons/fa';

import { stringAvatar } from '../../utils/avatars';

const TestimonialCard = ({ message, name, company }) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 4,
        py: 2,
        maxWidth: 350,
        m: 2,
        borderLeft: `10px solid ${theme.palette.primary.main}`
      }}>
      <Box sx={{ textAlign: 'left' }}>
        <FaQuoteLeft fontSize={30} color={theme.palette.primary.main} />
      </Box>
      <Typography variant='body1' sx={{ marginTop: 1 }}>
        {message}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: 2
        }}>
        <Avatar
          {...stringAvatar(name, {
            height: 60,
            width: 60,
            fontSize: 30,
            marginRight: 2
          })}
        />
        <Box>
          <Typography variant='h6'>{name}</Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            {company}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TestimonialCard;
