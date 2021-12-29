import React from 'react';
import { Stack } from '@mui/material';

const ChipSelect = ({
  value = [''],
  exclusive = false,
  children,
  onChange,
  direction = 'row',
  disabled = false,
  color = 'default',
  ...rest
}) => {
  const handleClick = (val) => (event) => {
    if (!onChange) {
      return;
    }

    const index = value && value.indexOf(val);
    let newValue;

    if (value && index >= 0) {
      newValue = value.slice();
      newValue.splice(index, 1);
    } else {
      newValue = value ? value.concat(val) : [val];
    }

    onChange(event, newValue);
  };

  const handleExclusiveClick = (val) => (event) => {
    if (!onChange) {
      return;
    }

    onChange(event, value === val ? null : val);
  };

  const isValueSelected = (value, candidate) => {
    if (candidate === undefined || value === undefined) {
      return false;
    }

    if (Array.isArray(candidate)) {
      return candidate.indexOf(value) >= 0;
    }

    return value === candidate;
  };

  return (
    <Stack direction='row' sx={{ flexWrap: 'wrap' }} spacing={1} {...rest}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        return React.cloneElement(child, {
          selected:
            child.props.selected === undefined
              ? isValueSelected(child.props.value, value)
              : child.props.selected,
          onClick: exclusive
            ? handleExclusiveClick(child.props.value)
            : handleClick(child.props.value),
          color: child.props.color || color,
          disabled: child.props.disabled || disabled
        });
      })}
    </Stack>
  );
};

export default ChipSelect;
