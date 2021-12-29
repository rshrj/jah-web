import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CountInput = ({
  value,
  minValue = -Infinity,
  maxValue = Infinity,
  onChange,
  label,
  sx
}) => {
  const theme = useTheme();

  let minusDisabled = value <= minValue;
  let plusDisabled = value >= maxValue;

  const handlePlus = (event) => {
    if (!onChange) {
      return;
    }

    if (plusDisabled) {
      return;
    }

    onChange(event, value + 1);
  };

  const handleMinus = (event) => {
    if (!onChange) {
      return;
    }

    if (minusDisabled) {
      return;
    }

    onChange(event, value - 1);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <Typography sx={{ marginRight: 1 }}>{label}</Typography>
      <IconButton
        sx={{
          mx: 1,
          border: `1px solid ${
            minusDisabled ? theme.palette.grey[300] : theme.palette.grey[400]
          }`
        }}
        disabled={minusDisabled}
        onClick={handleMinus}>
        <FaMinus
          fontSize={15}
          color={
            minusDisabled ? theme.palette.grey[300] : theme.palette.grey[600]
          }
        />
      </IconButton>
      <Typography variant='h6' sx={{ mx: 1 }}>
        {value}
      </Typography>
      <IconButton
        sx={{
          mx: 1,
          border: `1px solid ${
            plusDisabled ? theme.palette.grey[300] : theme.palette.grey[400]
          }`
        }}
        disabled={plusDisabled}
        onClick={handlePlus}>
        <FaPlus
          fontSize={15}
          color={
            plusDisabled ? theme.palette.grey[300] : theme.palette.grey[600]
          }
        />
      </IconButton>
    </Box>
  );
};

export default CountInput;
