import {
  FormControl,
  FormGroup,
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
import RentLeaseForm from './RentLeaseForm';

const NewProperty = () => {
  const [tab, setTab] = useState('');

  const [values, setValues] = useState({
    rentlease: {
      location: '',
      landmark: '',
      apartmentType: '1rk',
      rent: '',
      electricityIncluded: false,
      priceNegotiable: false,
      deposit: '',
      numBathrooms: '1',
      numBalconies: '1',
      builtUpArea: '',
      superBuiltUpArea: '',
      otherRooms: [],
      furnishing: '',
      coveredParking: 0,
      openParking: 0,
      totalFloors: '',
      propertyOnFloor: '',
      ageOfProperty: '',
      availableFrom: new Date(),
      willingToRentOutTo: [],
      pictures: [],
      featuredPicture: undefined
    }
  });

  const handleTabChange = (event, newVal) => {
    setTab(newVal);
  };

  const handleRentLeaseChange = (newVal) => {
    setValues({ ...values, rentlease: newVal });
  };

  const isPhone = useMediaQuery('(min-width:600px)');

  let projectForm = <Box></Box>;

  let apartmentForm = <Box></Box>;

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
        variant='h4'
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          marginBottom: 2
        }}>
        Add new property
      </Typography>
      <FormGroup>
        <FormControl sx={{ marginBottom: 5 }}>
          <Typography
            variant='body1'
            sx={{ color: 'text.secondary', marginBottom: 1 }}>
            What would you like to do?
          </Typography>
          <ToggleButtonGroup
            orientation={isPhone ? 'horizontal' : 'vertical'}
            value={tab}
            exclusive
            color='primary'
            onChange={handleTabChange}
            aria-label='what would you like to do?'
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
                  px: { xs: 7, md: 4 }
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
                  <Typography
                    variant='caption'
                    sx={{ color: 'text.secondary' }}>
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
                  px: { xs: 7, md: 4 }
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
                  <Typography
                    variant='caption'
                    sx={{ color: 'text.secondary' }}>
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
                  px: { xs: 7, md: 4 }
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
                </Box>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        {tab === 'rentlease' && (
          <RentLeaseForm
            values={values.rentlease}
            onChange={handleRentLeaseChange}
          />
        )}
        {tab === 'sellproject' && projectForm}
        {tab === 'sellapartment' && apartmentForm}
      </FormGroup>
    </Box>
  );
};

export default NewProperty;
