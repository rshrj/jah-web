import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
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

  return (
    <Box sx={{ p: { xs: 0, md: 5 }, m: 2 }}>
      <ToggleButtonGroup
        value={val}
        exclusive
        color='primary'
        onChange={handleToggleClick}
        aria-label='text alignment'
        sx={{ textDecoration: 'none' }}>
        <ToggleButton value='sellproject' aria-label='sell project'>
          <Box
            sx={{
              display: 'inline-flex',
              justiftContent: 'center',
              alignItems: 'center',
              textDecoration: 'none',
              px: 4
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
              px: 4
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
              px: 4
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
