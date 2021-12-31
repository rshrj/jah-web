import {
  FormLabel,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText
} from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { nanoid } from 'nanoid';

const JPasswordField = ({
  errors,
  handleChange,
  handleClickShowPassword,
  value,
  topLabel,
  placeholder,
  showPassword,
  defaultHelperText = 'Must be 8 charaters or more',
  ...rest
}) => {
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <FormLabel
        sx={{
          color: 'text.primary',
          marginBottom: 1
        }}>
        {topLabel}
      </FormLabel>
      <FormControl
        sx={{
          marginBottom: 2
        }}>
        <InputLabel
          htmlFor={'id' in rest ? rest.id : `password-field-${nanoid(6)}`}>
          {placeholder}
        </InputLabel>
        <OutlinedInput
          error={errors !== undefined}
          id={'id' in rest ? rest.id : `password-field-${nanoid(6)}`}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='Toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </IconButton>
            </InputAdornment>
          }
          label={placeholder}
          {...rest}
        />
        <FormHelperText error={errors !== undefined}>
          {errors !== undefined ? errors : defaultHelperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default JPasswordField;
