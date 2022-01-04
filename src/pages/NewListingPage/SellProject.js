import {
  Button,
  Checkbox,
  Divider,
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
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DatePicker } from '@mui/lab';
import { Box } from '@mui/system';
import { FaArrowCircleRight, FaTimes } from 'react-icons/fa';
import { ToWords } from 'to-words';

import locationOptions from '../../constants/locations.json';
import unitLabels from '../../constants/unitLabels';

import { ChipOption, ChipSelect } from '../../components/ChipSelect';
import CountInput from '../../components/CountInput/CountInput';
import { JInputField, JInputSearch } from '../../components/JInputField';
import { useState } from 'react';
import UploadZone from '../../components/UploadZone';

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

const UnitForm = ({
  unit,
  unitValues = {
    price: '',
    pricePerSqFt: '',
    allInclusivePrice: false,
    taxAndGovtChargesExcluded: true,
    priceNegotiable: false,
    numBathrooms: '1',
    numBalconies: '1',
    carpetArea: '',
    builtUpArea: '',
    superBuiltUpArea: '',
    otherRooms: [],
    furnishing: ''
  },
  onChange
}) => {
  const isPhone = useMediaQuery('(min-width:600px)');

  const [addBuiltUpArea, setAddBuiltUpArea] = useState(false);
  const [addSuperBuiltUpArea, setAddSuperBuiltUpArea] = useState(false);

  const handleAddBuiltUpArea = (e) => {
    e.preventDefault();
    setAddBuiltUpArea(!addBuiltUpArea);
  };

  const handleAddSuperBuiltUpArea = (e) => {
    e.preventDefault();
    setAddSuperBuiltUpArea(!addSuperBuiltUpArea);
  };

  const handleToggle = (prop) => (event, newVal) => {
    if (!onChange) {
      return;
    }

    onChange({ ...unitValues, [prop]: newVal });
  };

  const handleChange = (prop) => (event) => {
    if (!onChange) {
      return;
    }

    onChange({ ...unitValues, [prop]: event.target.value });
  };

  const handleCheck = (prop) => (event) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...unitValues,
      [prop]: event.target.checked
    });
  };

  return (
    <>
      <FormControl
        sx={{
          marginBottom: 5,
          marginTop: 3
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
            Price Details for {unitLabels[unit]}
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
          <FormGroup sx={{ width: '48%' }}>
            <TextField
              error={undefined !== undefined}
              value={unitValues.price}
              onChange={handleChange('price')}
              label='Expected price in Rupees'
              sx={{ width: '100%' }}
            />
            <FormHelperText>
              {unitValues.price !== '' && isNumeric(unitValues.price)
                ? toWords.convert(unitValues.price)
                : 'Price in words'}
            </FormHelperText>
            {undefined !== undefined ? (
              <FormHelperText error>{undefined}</FormHelperText>
            ) : (
              undefined !== undefined && (
                <FormHelperText>{undefined}</FormHelperText>
              )
            )}
          </FormGroup>

          <FormGroup sx={{ width: '48%' }}>
            <TextField
              error={undefined !== undefined}
              value={unitValues.pricePerSqFt}
              onChange={handleChange('pricePerSqFt')}
              label='Price per sq. ft.'
              sx={{ width: '100%' }}
            />
            <FormHelperText>
              {unitValues.pricePerSqFt !== '' &&
              isNumeric(unitValues.pricePerSqFt)
                ? toWords.convert(unitValues.pricePerSqFt)
                : 'Price in words'}
            </FormHelperText>
            {undefined !== undefined ? (
              <FormHelperText error>{undefined}</FormHelperText>
            ) : (
              undefined !== undefined && (
                <FormHelperText>{undefined}</FormHelperText>
              )
            )}
          </FormGroup>
        </FormGroup>
      </FormControl>

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
              checked={unitValues.allInclusivePrice}
              onChange={handleCheck('allInclusivePrice')}
            />
          }
          label='All Inclusive Price'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={unitValues.taxAndGovtChargesExcluded}
              onChange={handleCheck('taxAndGovtChargesExcluded')}
            />
          }
          label='Tax &amp; Govt. charges excluded'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={unitValues.priceNegotiable}
              onChange={handleCheck('priceNegotiable')}
            />
          }
          label='Price Negotiable'
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
            Number of Bathrooms in {unitLabels[unit]}
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={unitValues.numBathrooms}
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
            Number of Balconies in {unitLabels[unit]}
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={unitValues.numBalconies}
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
            Area Details of {unitLabels[unit]}
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
          value={unitValues.carpetArea}
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
              value={unitValues.builtUpArea}
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
              value={unitValues.superBuiltUpArea}
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
            Other Rooms in {unitLabels[unit]}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Optional)
          </Typography>
        </FormLabel>
        <ChipSelect
          value={unitValues.otherRooms}
          onChange={handleToggle('otherRooms')}
          direction={isPhone ? 'row' : 'column'}>
          <ChipOption value='poojaRoom' label='Pooja Room' />
          <ChipOption value='studyRoom' label='Study Room' />
          <ChipOption value='servantRoom' label='Servant Room' />
          <ChipOption value='storeRoom' label='Store Room' />
        </ChipSelect>
      </FormControl>

      <FormControl sx={{ marginBottom: 3 }}>
        <FormLabel
          sx={{
            color: 'text.primary',
            marginBottom: 1
          }}>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Furnishing in {unitLabels[unit]}
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={unitValues.furnishing}
          onChange={handleToggle('furnishing')}
          exclusive>
          <ChipOption value='furnished' label='Furnished' />
          <ChipOption value='semiFurnished' label='Semi-furnished' />
          <ChipOption value='unFurnished' label='Un-furnished' />
        </ChipSelect>
      </FormControl>

      <Divider variant='middle' />
    </>
  );
};

const SellProjectForm = ({
  values = {
    name: '',
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
  },
  onChange,
  disabled = false
}) => {
  const isPhone = useMediaQuery('(min-width:600px)');
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

    onChange({ ...values, [prop]: newVal });
  };

  const handleChange = (prop) => (event) => {
    if (!onChange) {
      return;
    }

    onChange({ ...values, [prop]: event.target.value });
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

  const handleDateChange = (prop) => (newDate) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      [prop]: newDate
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

  const handleUnitChange = (unit) => (newValue) => {
    if (!onChange) {
      return;
    }

    onChange({
      ...values,
      units: {
        ...values.units,
        [unit]: newValue
      }
    });
  };

  return (
    <>
      <JInputField
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Name of the project
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        }
        placeholder='Enter the name of the project'
        value={values.name}
        spacing={5}
        handleChange={handleChange('name')}
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
        placeholder='Enter the closest landmark to the project'
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
            sx={{
              fontWeight: 'bold',
              display: 'inline-block',
              marginRight: 1
            }}>
            Type of Units
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ fontWeight: 'normal', display: 'inline-block' }}>
            (Select all applicable units in your project)
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.apartmentTypes}
          onChange={handleToggle('apartmentTypes')}>
          <ChipOption value='1rk' label='1RK' />
          <ChipOption value='1bhk' label='1BHK' />
          <ChipOption value='2bhk' label='2BHK' />
          <ChipOption value='3bhk' label='3BHK' />
          <ChipOption value='4bhk' label='4BHK' />
        </ChipSelect>
      </FormControl>

      {values.apartmentTypes.map((unit) => (
        <UnitForm
          unit={unit}
          key={unit}
          unitValues={values.units[unit]}
          onChange={handleUnitChange(unit)}
        />
      ))}

      {/* <JInputField
        topLabel={
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ fontWeight: 'bold' }}>
            Price Details
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
      /> */}

      <FormControl sx={{ marginBottom: 5, marginTop: 5 }}>
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
            Floor Details of the project
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
          {/* <Typography
            variant='body2'
            color='text.secondary'
            sx={{ display: 'inline-block' }}>
            (Add at least one type)
          </Typography> */}
        </FormLabel>

        <TextField
          error={undefined !== undefined}
          value={values.totalFloors}
          onChange={handleChange('totalFloors')}
          label='Total Floors in the project'
        />
        {undefined !== undefined ? (
          <FormHelperText error>{undefined}</FormHelperText>
        ) : (
          undefined !== undefined && (
            <FormHelperText>{undefined}</FormHelperText>
          )
        )}
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
            Age of Project
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
            Availability Status
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.availabilityStatus}
          onChange={handleToggle('availabilityStatus')}
          exclusive>
          <ChipOption value='readyToMove' label='Ready to move' />
          <ChipOption value='underConstruction' label='Under construction' />
        </ChipSelect>
        {values.availabilityStatus === 'underConstruction' && (
          <>
            <FormLabel
              sx={{
                color: 'text.primary',
                marginBottom: 1,
                marginTop: 1
              }}>
              <Typography
                variant='body1'
                color='text.secondary'
                sx={{ fontWeight: 'bold' }}>
                Possession by:
              </Typography>
            </FormLabel>
            <DatePicker
              label='Enter the ready-to-move-in date'
              openTo='year'
              views={['year', 'month']}
              value={values.possessionBy}
              onChange={handleDateChange('possessionBy')}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        )}
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
            Ownership Type
            <span style={{ color: lighten('#ff0000', 0.5) }}>*</span>
          </Typography>
        </FormLabel>
        <ChipSelect
          value={values.ownershipType}
          onChange={handleToggle('ownershipType')}
          exclusive>
          <ChipOption value='freehold' label='Freehold' />
          <ChipOption value='leasehold' label='Leasehold' />
          <ChipOption value='cooperativeSociety' label='Cooperative Society' />
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
            What makes the project unique?
          </Typography>
        </FormLabel>
        <TextareaAutosize
          aria-label='What makes the project unique?'
          minRows={3}
          value={values.usp}
          onChange={handleChange('usp')}
          placeholder='Spacious rooms, well maintained facilities, sufficient ventilation'
          style={{ fontFamily: 'inherit' }}
          disabled={values.usp.length > 5000}
        />
        <Typography color='text.secondary' sx={{ marginTop: 1 }}>
          {values.usp.length} / 5000
        </Typography>
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
            Add pictures of the project
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
              Project Brochure
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: 'inline-block' }}>
              (Optional)
            </Typography>
          </>
        }
        placeholder='Enter a link to a project brochure'
        helperText={
          <span>
            You can host your file on{' '}
            <Link
              href='https://drive.google.com'
              target='_blank'
              rel='noopener noreferrer'
              underline='hover'>
              Google drive
            </Link>{' '}
            or{' '}
            <Link
              href='https://dropbox.com'
              target='_blank'
              rel='noopener noreferrer'
              underline='hover'>
              Dropbox
            </Link>{' '}
            with link sharing on or{' '}
            <Link
              href='https://pdfhost.io'
              target='_blank'
              rel='noopener noreferrer'
              underline='hover'>
              pdfhost.io
            </Link>
          </span>
        }
        value={values.brochureLink}
        handleChange={handleChange('brochureLink')}
        disabled={false}
        spacing={5}
      />

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
              Video of the project
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ display: 'inline-block' }}>
              (Optional)
            </Typography>
          </>
        }
        placeholder='Enter a link to a project video (YouTube / Vimeo)'
        value={values.videoLink}
        handleChange={handleChange('videoLink')}
        disabled={false}
        spacing={5}
      />
    </>
  );
};

export default SellProjectForm;
