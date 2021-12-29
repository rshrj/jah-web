import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';

const JInputSearch = ({
  options,
  errors,
  handleChange,
  value,
  topLabel,
  spacing,
  placeholder,
  ...rest
}) => {
  return (
    <FormControl
      sx={{
        marginBottom: spacing === undefined ? 2 : spacing
      }}>
      <FormLabel
        sx={{
          color: 'text.primary',
          marginBottom: 1
        }}>
        {topLabel}
      </FormLabel>
      <Autocomplete
        disablePortal
        options={options}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              error={errors !== undefined}
              value={value}
              onChange={handleChange}
              label={placeholder}
              {...rest}
            />
          );
        }}
      />

      {errors !== undefined && <FormHelperText error>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default JInputSearch;
