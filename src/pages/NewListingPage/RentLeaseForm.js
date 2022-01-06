import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  lighten,
  Link,
  OutlinedInput,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { Box } from '@mui/system';
import { FaTimes } from 'react-icons/fa';
import { ToWords } from 'to-words';

import locationOptions from '../../constants/locations.json';
import unitLabels from '../../constants/unitLabels';

import { ChipOption, ChipSelect } from '../../components/ChipSelect';
import CountInput from '../../components/CountInput/CountInput';
import Emoji from '../../components/Emoji/Emoji';
import { JInputField, JInputSearch } from '../../components/JInputField';
import { useState } from 'react';
import UploadZone from '../../components/UploadZone';

import { isNumeric } from '../../utils/helpers';

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true
  }
});

const genOptions = (totalCount) => {
  let count =
    totalCount === undefined ||
    totalCount === '' ||
    parseInt(totalCount, 10) < 1 ||
    parseInt(totalCount, 10) > 100
      ? 25
      : parseInt(totalCount, 10);
  let newOptions = [
    {
      id: -2,
      label: 'Basement'
    },
    {
      id: -1,
      label: 'Lower Ground'
    },
    {
      id: 0,
      label: 'Ground'
    }
  ];

  for (let i = 1; i <= count; ++i) {
    newOptions.push({
      id: i,
      label: `${i}`
    });
  }

  return newOptions;
};

const RentLeaseForm = ({
  values = {
    name: '',
    societyName: '',
    location: '',
    landmark: '',
    apartmentType: '1rk',
    rent: '',
    electricityIncluded: false,
    priceNegotiable: false,
    deposit: '',
    numBathrooms: '1',
    numBalconies: '1',
    carpetArea: '',
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
  onChange,
  errors,
  disabled = false
}) => {
  const isPhone = useMediaQuery('(min-width:600px)');

  const [addBuiltUpArea, setAddBuiltUpArea] = useState(false);
  const [addSuperBuiltUpArea, setAddSuperBuiltUpArea] = useState(false);
  const [autoVal, setAutoVal] = useState({
    location: '',
    propertyOnFloor: ''
  });

  const handleAutoValChange = (prop) => (event, newVal) => {
    setAutoVal({
      ...autoVal,
      [prop]: newVal
    });
  };

  const handleToggle = (prop) => (event, newVal) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      [prop]: newVal,
      name: `${
        values.apartmentType !== '' ? unitLabels[values.apartmentType] : ''
      } in ${values.location}`
    });
  };

  const handleChange = (prop) => (event) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      [prop]: event.target.value,
      name: `${
        values.apartmentType !== '' ? unitLabels[values.apartmentType] : ''
      } in ${values.location}`
    });
  };

  const handleCheck = (prop) => (event) => {
    if (!onChange) {
      return;
    }

    onChange({
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
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      availableFrom: newDate
    });
  };

  const handleFilesChange = (event, newFiles) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      pictures: newFiles
    });
  };

  const handleSelectedFileChange = (event, file) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      featuredPicture: file
    });
  };

  return (
    <>
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
              Name of the society / building
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: 'inline-block' }}>
              (Optional)
            </Typography>
          </>
        }
        placeholder='Enter the name of your society / building'
        value={values.societyName}
        spacing={5}
        handleChange={handleChange('societyName')}
        disabled={false}
      />

      <JInputSearch
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Location<span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        }
        options={locationOptions}
        spacing={5}
        placeholder='Where is your property located?'
        inputValue={values.location}
        value={autoVal.location}
        onChange={handleAutoValChange('location')}
        onInputChange={handleToggle('location')}
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
            freeSolo
            onInputChange={handleToggle('propertyOnFloor')}
            onChange={handleAutoValChange('propertyOnFloor')}
            inputValue={values.propertyOnFloor}
            value={autoVal.propertyOnFloor}
            options={genOptions(values.totalFloors)}
            renderInput={(params) => (
              <FormControl ref={params.InputProps.ref} sx={{ width: '100%' }}>
                <TextField
                  error={undefined !== undefined}
                  inputProps={{ ...params.inputProps }}
                  label='Property on Floor'
                />
              </FormControl>
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
          inputFormat='MMM dd, yyyy'
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
            Add pictures of your property
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <UploadZone
          files={values.pictures}
          selectedFile={values.featuredPicture}
          onFilesChange={handleFilesChange}
          onSelectedFileChange={handleSelectedFileChange}
          label1='Drag and drop or click to choose files'
          label2='Select one of the uploads below as the featured image'
          accept='image/*'
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
              Video of the property
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: 'inline-block' }}>
              (Optional)
            </Typography>
          </>
        }
        placeholder='Enter a link to a property video (YouTube / Vimeo)'
        value={values.videoLink}
        handleChange={handleChange('videoLink')}
        disabled={false}
        spacing={5}
      />
    </>
  );
};

export default RentLeaseForm;
