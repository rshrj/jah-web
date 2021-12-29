import { Chip } from '@mui/material';

const ChipOption = ({
  value,
  onClick,
  selected = true,
  onChange,
  color = 'default',
  label,
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
      variant='outlined'
      label={label}
      sx={{ marginBottom: 1 }}
      {...rest}></Chip>
  );
};

export default ChipOption;
