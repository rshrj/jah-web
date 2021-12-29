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
  helperText,
  spacing,
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
      <TextField
        error={errors !== undefined}
        value={value}
        onChange={handleChange}
        label={placeholder}
        {...rest}
      />
      {errors !== undefined ? (
        <FormHelperText error>{errors}</FormHelperText>
      ) : (
        helperText !== undefined && (
          <FormHelperText>{helperText}</FormHelperText>
        )
      )}
    </FormControl>
  );
};

export default JInputField;
