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
  value,
  inputValue,
  onChange,
  onInputChange,
  topLabel,
  spacing,
  placeholder,
  disabled = false,
  ...rest
}) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      onInputChange={onInputChange}
      onChange={onChange}
      inputValue={inputValue}
      value={value}
      disabled={disabled}
      renderInput={(params) => {
        return (
          <FormControl
            sx={{
              marginBottom: spacing === undefined ? 2 : spacing,
              width: '100%'
            }}
            ref={params.InputProps.ref}>
            <FormLabel
              sx={{
                color: 'text.primary',
                marginBottom: 1
              }}
              ref={params.InputLabelProps.ref}>
              {topLabel}
            </FormLabel>
            <TextField
              error={errors !== undefined}
              type='text'
              inputProps={{ ...params.inputProps }}
              label={placeholder}
              disabled={disabled}
              {...rest}
            />

            {errors !== undefined && (
              <FormHelperText error>{errors}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default JInputSearch;
