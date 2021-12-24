import {
  FormControl,
  FormLabel,
  TextField,
  FormHelperText
} from '@mui/material';

const JInputField = ({
  errors,
  handleChange,
  value,
  topLabel,
  placeholder,
  ...rest
}) => {
  return (
    <FormControl
      sx={{
        marginBottom: 2
      }}>
      <FormLabel
        sx={{
          color: 'text.primary',
          marginBottom: 1
        }}>
        {topLabel}
      </FormLabel>
      <TextField
        error={errors !== ''}
        value={value}
        onChange={handleChange}
        label={placeholder}
        {...rest}
      />
      {errors !== '' && <FormHelperText error>{errors}</FormHelperText>}
    </FormControl>
  );
};

export default JInputField;
