import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import {
  EVENT_KEY_DISPLAY,
  STAR_KEY_DISPLAY,
} from '../../types/configurations';
import { IStar } from '../../types/interfaces';

interface Props {
  field: keyof IStar;
  register: UseFormRegister<any>;
  errors: {[x: string]: any};
  fullWidth?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  multiline?: boolean;
  variant?: 'standard' | 'outlined';
  sx?: any;
  element?: 'star' | 'event';
}

const InputField = ({
  field, register,
  errors,
  defaultValue,
  fullWidth,
  disabled,
  multiline,
  variant,
  sx,
  element,
}: Props) => {
  const [value, setValue] = useState<string>(defaultValue || '');

  return (
    <>
      <TextField
        fullWidth={fullWidth}
        disabled={disabled}
        multiline={multiline}
        variant={variant}
        sx={sx}
        value={value}
        label={element === 'star'
          ? STAR_KEY_DISPLAY
            .find((starKey) => starKey.key === field)?.display
          : EVENT_KEY_DISPLAY
            .find((eventKey) => eventKey.key === field)?.display}
        {...register(field)}
        onChange={(e) => setValue(e.target.value)}
        error={errors[field]}
      />
      <Typography variant="inherit" color="textSecondary">
        {errors[field]?.message}
      </Typography>
    </>
  );
};

export default InputField;

InputField.defaultProps = {
  fullWidth: false,
  defaultValue: undefined,
  disabled: false,
  multiline: false,
  variant: 'standard',
  sx: undefined,
  element: 'star',
};
