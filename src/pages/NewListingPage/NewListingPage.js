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
import SellApartmentForm from './SellApartmentForm';
import SellProjectForm from './SellProject';

const NewListingPage = () => {
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
      featuredPicture: undefined,
      videoLink: ''
    },
    sellapartment: {
      location: '',
      landmark: '',
      apartmentType: '1rk',
      price: '',
      pricePerSqFt: '',
      allInclusivePrice: false,
      taxAndGovtChargesExcluded: true,
      priceNegotiable: false,
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
      availabilityStatus: 'readyToMove',
      possessionBy: new Date(),
      ownershipType: 'freehold',
      usp: 'Spacious rooms, well maintained facilities, sufficient ventilation',
      pictures: [],
      featuredPicture: undefined,
      videoLink: ''
    },
    sellproject: {
      location: '',
      landmark: '',
      apartmentTypes: ['1rk'],
      units: {},
      coveredParking: 0,
      openParking: 0,
      totalFloors: '',
      propertyOnFloor: '',
      ageOfProperty: '',
      availabilityStatus: 'readyToMove',
      possessionBy: new Date(),
      ownershipType: 'freehold',
      usp: 'Spacious rooms, well maintained facilities, sufficient ventilation',
      pictures: [],
      featuredPicture: undefined,
      videoLink: '',
      brochureLink: ''
    }
  });

  const handleTabChange = (event, newVal) => {
    setTab(newVal);
  };

  const handleChange = (prop) => (newVal) => {
    setValues({ ...values, [prop]: newVal });
  };

  const isPhone = useMediaQuery('(min-width:600px)');

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
        Add new listing
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
            onChange={handleChange('rentlease')}
          />
        )}
        {tab === 'sellproject' && (
          <SellProjectForm
            values={values.sellproject}
            onChange={handleChange('sellproject')}
          />
        )}
        {tab === 'sellapartment' && (
          <SellApartmentForm
            values={values.sellapartment}
            onChange={handleChange('sellapartment')}
          />
        )}
      </FormGroup>
    </Box>
  );
};

export default NewListingPage;
