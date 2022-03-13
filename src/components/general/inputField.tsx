import { TextField, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { eventKeyDisplay, starKeyDisplay } from '../../assets';

interface fieldProps {
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
}: fieldProps) => (
  <>
    <TextField
      fullWidth={fullWidth}
      disabled={disabled}
      multiline={multiline}
      variant={variant}
      sx={sx}
      defaultValue={defaultValue}
      label={element === 'star'
        ? starKeyDisplay.find((k) => k.key === field)?.display
        : eventKeyDisplay.find((k) => k.key === field)?.display}
      {...register(field)}
      error={errors[field]}
    />
    <Typography variant="inherit" color="textSecondary">
      {errors[field]?.message}
    </Typography>
  </>
);

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
