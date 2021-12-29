import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Box } from '@mui/system';
import {
  MdLocationCity,
  MdMapsHomeWork,
  MdAccountBalance,
  MdFamilyRestroom
} from 'react-icons/md';
import { useState } from 'react';
import { lighten } from '@mui/material/styles';
import { ToWords } from 'to-words';

import floorOptions from './floorOptions.json';

import { JInputField, JInputSearch } from '../../components/JInputField';
import { ChipOption, ChipSelect } from '../../components/ChipSelect';
import { FaFemale, FaMale, FaPlus, FaTimes } from 'react-icons/fa';
import CountInput from '../../components/CountInput/CountInput';
import { DatePicker } from '@mui/lab';
import Emoji from '../../components/Emoji/Emoji';

const isNumeric = (str) => {
  if (typeof str != 'string') return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true
  }
});

const NewProperty = () => {
  const [values, setValues] = useState({
    tab: '',
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
    willingToRentOutTo: []
  });

  const [addBuiltUpArea, setAddBuiltUpArea] = useState(false);
  const [addSuperBuiltUpArea, setAddSuperBuiltUpArea] = useState(false);

  const options = [
    { id: 1, label: 'Vashi' },
    { id: 2, label: 'Mankhurd' },
    { id: 3, label: 'Kharghar' },
    { id: 4, label: 'Vash1i' },
    { id: 5, label: 'Mankh4urd' },
    { id: 6, label: 'Kha5rghar' },
    { id: 7, label: 'Vas3hi' },
    { id: 8, label: 'Mank3hurd' },
    { id: 9, label: 'Khar2ghar' },
    { id: 10, label: 'Vas4hi' },
    { id: 11, label: 'Ma5nkhurd' },
    { id: 12, label: 'Kha6rghar' },
    { id: 13, label: 'Vash7i' },
    { id: 14, label: 'Maynkhurd' },
    { id: 15, label: 'Khagrghar' }
  ];

  const handleToggle = (prop) => (event, newVal) => {
    setValues({ ...values, [prop]: newVal });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheck = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.checked
    });
  };

  const handleAddBuiltUpArea = (e) => {
    e.preventDefault();
    setAddBuiltUpArea(!addBuiltUpArea);
  };

  const handleAddSuperBuiltUpArea = (e) => {
    e.preventDefault();
    setAddSuperBuiltUpArea(!addSuperBuiltUpArea);
  };

  const handleDateChange = (newDate) => {
    setValues({
      ...values,
      availableFrom: newDate
    });
  };

  const isPhone = useMediaQuery('(min-width:600px)');

  let rentForm = (
    <>
      <JInputSearch
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Location<span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        }
        options={options}
        spacing={5}
        placeholder='Where is your property located?'
        value={values.location}
        handleChange={handleChange('location')}
        disabled={false}
      />

      <JInputField
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Landmark<span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        }
        placeholder='Enter the closest landmark to your property'
        value={values.landmark}
        spacing={5}
        handleChange={handleChange('landmark')}
        disabled={false}
      />

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Type of Apartment
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.apartmentType}
          onChange={handleToggle('apartmentType')}
          exclusive>
          <ChipOption value='1rk' label='1RK' />
          <ChipOption value='1bhk' label='1BHK' />
          <ChipOption value='2bhk' label='2BHK' />
          <ChipOption value='3bhk' label='3BHK' />
          <ChipOption value='4bhk' label='4BHK' />
        </ChipSelect>
      </FormControl>

      <JInputField
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Rent Details
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        }
        placeholder='Expected rent in Rupees'
        value={values.rent}
        handleChange={handleChange('rent')}
        disabled={false}
        spacing={5}
        helperText={
          values.rent !== '' && isNumeric(values.rent)
            ? toWords.convert(values.rent)
            : 'Rent in words'
        }
      />

      <FormControl
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          marginTop: -5,
          marginBottom: 5
        }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.electricityIncluded}
              onChange={handleCheck('electricityIncluded')}
            />
          }
          label='Electricity and Water charges included'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.priceNegotiable}
              onChange={handleCheck('priceNegotiable')}
            />
          }
          label='Price Negotiable'
        />
      </FormControl>

      <JInputField
        topLabel={
          <>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{
                fontWeight: 'bold',
                display: 'inline-block',
                marginRight: 1
              }}>
              Security Deposit
              <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: 'inline-block' }}>
              (Type '0' if deposit is not required)
            </Typography>
          </>
        }
        placeholder='Deposit value in Rupees'
        value={values.deposit}
        handleChange={handleChange('deposit')}
        disabled={false}
        spacing={5}
        helperText={
          values.deposit !== '' && isNumeric(values.deposit)
            ? toWords.convert(values.deposit)
            : 'Deposit in words'
        }
      />

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Number of Bathrooms
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.numBathrooms}
          onChange={handleToggle('numBathrooms')}
          exclusive>
          <ChipOption value='1' label='1' />
          <ChipOption value='2' label='2' />
          <ChipOption value='3' label='3' />
          <ChipOption value='4' label='4' />
        </ChipSelect>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Number of Balconies
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.numBalconies}
          onChange={handleToggle('numBalconies')}
          exclusive>
          <ChipOption value='0' label='0' />
          <ChipOption value='1' label='1' />
          <ChipOption value='2' label='2' />
          <ChipOption value='3' label='3' />
          <ChipOption value='3+' label='More than 3' />
        </ChipSelect>
      </FormControl>

      <FormControl
        sx={{
          marginBottom: 5
        }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginRight: 1
            }}>
            Area Details
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Add at least one type)
          </Typography>
        </FormLabel>
        <TextField
          error={undefined !== undefined}
          value={values.carpetArea}
          onChange={handleChange('carpetArea')}
          label='Carpet Area in sq. ft.'
        />
        {undefined !== undefined ? (
          <FormHelperText error>{undefined}</FormHelperText>
        ) : (
          undefined !== undefined && (
            <FormHelperText>{undefined}</FormHelperText>
          )
        )}

        {addBuiltUpArea && (
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel htmlFor='builtUpArea-field'>
              Built-up Area in sq. ft.
            </InputLabel>
            <OutlinedInput
              error={undefined !== undefined}
              id='builtUpArea-field'
              value={values.builtUpArea}
              onChange={handleChange('builtUpArea')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='close built-up area'
                    onClick={handleAddBuiltUpArea}
                    onMouseDown={handleAddBuiltUpArea}
                    edge='end'>
                    <FaTimes />
                  </IconButton>
                </InputAdornment>
              }
              label='Built-up Area in sq. ft.'
            />
            {undefined !== undefined ? (
              <FormHelperText error>{undefined}</FormHelperText>
            ) : (
              undefined !== undefined && (
                <FormHelperText>{undefined}</FormHelperText>
              )
            )}
          </FormControl>
        )}

        {addSuperBuiltUpArea && (
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel htmlFor='superBuiltUpArea-field'>
              Super Built-up Area in sq. ft.
            </InputLabel>
            <OutlinedInput
              error={undefined !== undefined}
              id='superBuiltUpArea-field'
              value={values.superBuiltUpArea}
              onChange={handleChange('superBuiltUpArea')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='close super built-up area'
                    onClick={handleAddSuperBuiltUpArea}
                    onMouseDown={handleAddSuperBuiltUpArea}
                    edge='end'>
                    <FaTimes />
                  </IconButton>
                </InputAdornment>
              }
              label='Super Built-up Area in sq. ft.'
            />
            {undefined !== undefined ? (
              <FormHelperText error>{undefined}</FormHelperText>
            ) : (
              undefined !== undefined && (
                <FormHelperText>{undefined}</FormHelperText>
              )
            )}
          </FormControl>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 1
          }}>
          {!addBuiltUpArea && (
            <Link
              sx={{ '&:hover': { cursor: 'pointer' } }}
              onClick={handleAddBuiltUpArea}
              underline='hover'>
              Add Built-up Area
            </Link>
          )}
          {!addSuperBuiltUpArea && (
            <Link
              sx={{ '&:hover': { cursor: 'pointer' } }}
              onClick={handleAddSuperBuiltUpArea}
              underline='hover'>
              Add Super Built-up Area
            </Link>
          )}
        </Box>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginRight: 1
            }}>
            Other Rooms
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Optional)
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.otherRooms}
          onChange={handleToggle('otherRooms')}
          direction={isPhone ? 'row' : 'column'}>
          <ChipOption value='poojaRoom' label='Pooja Room' />
          <ChipOption value='studyRoom' label='Study Room' />
          <ChipOption value='servantRoom' label='Servant Room' />
          <ChipOption value='storeRoom' label='Store Room' />
        </ChipSelect>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Furnishing
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.furnishing}
          onChange={handleToggle('furnishing')}
          exclusive>
          <ChipOption value='furnished' label='Furnished' />
          <ChipOption value='semiFurnished' label='Semi-furnished' />
          <ChipOption value='unFurnished' label='Un-furnished' />
        </ChipSelect>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginRight: 1
            }}>
            Reserved Parking
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Optional)
          </Typography>
        </FormLabel>
        <Box
          sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CountInput
            value={values.coveredParking}
            minValue={0}
            maxValue={10}
            onChange={handleToggle('coveredParking')}
            label='Covered Parking'
            sx={{ marginRight: 5 }}
          />
          <CountInput
            value={values.openParking}
            minValue={0}
            maxValue={10}
            onChange={handleToggle('openParking')}
            label='Open Parking'
          />
        </Box>
      </FormControl>

      <FormControl
        sx={{
          marginBottom: 5
        }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginRight: 1
            }}>
            Floor Details
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
          {/* <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Add at least one type)
          </Typography> */}
        </FormLabel>

        <FormGroup
          row
          sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            error={undefined !== undefined}
            value={values.totalFloors}
            onChange={handleChange('totalFloors')}
            label='Total Floors'
            sx={{ width: '48%' }}
          />
          {undefined !== undefined ? (
            <FormHelperText error>{undefined}</FormHelperText>
          ) : (
            undefined !== undefined && (
              <FormHelperText>{undefined}</FormHelperText>
            )
          )}

          <Autocomplete
            disablePortal
            options={floorOptions}
            renderInput={(params) => (
              <TextField
                {...params}
                error={undefined !== undefined}
                value={values.propertyOnFloor}
                onChange={handleChange('propertyOnFloor')}
                label='Property on Floor'
              />
            )}
            sx={{ width: '48%' }}
          />
        </FormGroup>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Age of Property
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.ageOfProperty}
          onChange={handleToggle('ageOfProperty')}
          exclusive>
          <ChipOption value='0-1yrs' label='0-1 years' />
          <ChipOption value='1-5yrs' label='1-5 years' />
          <ChipOption value='5-10yrs' label='5-10 years' />
          <ChipOption value='10+yrs' label='10+ years' />
        </ChipSelect>
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Available From
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <DatePicker
          label='When is the property available from?'
          openTo='day'
          views={['year', 'month', 'day']}
          value={values.availableFrom}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>

      <FormControl sx={{ marginBottom: 5 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Willing to rent out to
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.willingToRentOutTo}
          onChange={handleToggle('willingToRentOutTo')}
          direction={isPhone ? 'row' : 'column'}>
          <ChipOption
            value='family'
            label={
              <>
                <Emoji symbol='👨‍👩‍👧‍👦' /> Family
              </>
            }
          />
          <ChipOption
            value='singleMen'
            label={
              <>
                <Emoji symbol='👨' /> Single Men
              </>
            }
          />
          <ChipOption
            value='singleWomen'
            label={
              <>
                <Emoji symbol='👩' /> Single Women
              </>
            }
          />
          <ChipOption
            value='unmarriedCouples'
            label={
              <>
                <Emoji symbol='👫' /> Unmarried Couple
              </>
            }
          />
        </ChipSelect>
      </FormControl>
    </>
  );

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
            value={values.tab}
            exclusive
            color='primary'
            onChange={handleToggle('tab')}
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
        {values.tab === 'rentlease' && rentForm}
        {values.tab === 'sellproject' && projectForm}
        {values.tab === 'sellapartment' && apartmentForm}
      </FormGroup>
    </Box>
  );
};

export default NewProperty;
