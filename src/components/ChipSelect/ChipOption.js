import { Chip } from '@mui/material';

const ChipOption = ({
  value,
  onClick,
  selected = true,
  onChange,
  color = 'default',
  label,
  marginBottom = 1,
  variant = 'outlined',
  ...rest
}) => {
  const handleChange = (event) => {
    if (onClick) {
      onClick(event, value);

      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };
  return (
    <Chip
      value={value}
      onClick={handleChange}
      onChange={onChange}
      color={selected ? 'primary' : 'default'}
      variant={variant}
      label={label}
      sx={{ marginBottom }}
      {...rest}></Chip>
  );
};

export default ChipOption;
