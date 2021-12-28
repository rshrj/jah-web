import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Box } from '@mui/system';
import {
  MdLocationCity,
  MdMapsHomeWork,
  MdAccountBalance
} from 'react-icons/md';
import { useState } from 'react';

const NewProperty = () => {
  const [val, setVal] = useState('left');

  const handleToggleClick = (event, newVal) => {
    setVal(newVal);
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box
      sx={{
        p: { xs: 0, md: 5 },
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography
        variant='h3'
        sx={{ textAlign: 'center', color: 'primary.main', marginBottom: 2 }}>
        Add new property
      </Typography>
      <Typography
        variant='h6'
        sx={{ color: 'text.secondary', marginBottom: 1 }}>
        What would you like to do?
      </Typography>
      <ToggleButtonGroup
        orientation={matches ? 'horizontal' : 'vertical'}
        value={val}
        exclusive
        color='primary'
        onChange={handleToggleClick}
        aria-label='text alignment'
        sx={{
          textDecoration: 'none'
        }}>
        <ToggleButton value='sellproject' aria-label='sell project'>
          <Box
            sx={{
              display: 'inline-flex',
              justiftContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              px: { xs: 0, md: 4 }
            }}>
            <MdLocationCity fontSize={40} />
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                justiftContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                marginLeft: 2
              }}>
              <Typography>Sell Project</Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                (several flats)
              </Typography>
            </Box>
          </Box>
        </ToggleButton>
        <ToggleButton value='sellapartment' aria-label='sell apartment'>
          <Box
            sx={{
              display: 'inline-flex',
              justiftContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              px: { xs: 0, md: 4 }
            }}>
            <MdMapsHomeWork fontSize={40} />
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                justiftContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                marginLeft: 2
              }}>
              <Typography>Sell Apartment</Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                (resell homes)
              </Typography>
            </Box>
          </Box>
        </ToggleButton>
        <ToggleButton value='rentlease' aria-label='rent lease'>
          <Box
            sx={{
              display: 'inline-flex',
              justiftContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              px: { xs: 0, md: 4 }
            }}>
            <MdAccountBalance fontSize={40} />
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                justiftContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
                marginLeft: 2
              }}>
              <Typography>Rent / Lease</Typography>
              {/* <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                (several flats)
              </Typography> */}
            </Box>
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default NewProperty;
