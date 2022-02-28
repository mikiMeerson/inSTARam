import { TextField, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { starKeyDisplay } from '../../assets';

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
}: fieldProps) => (
  <>
    <TextField
      fullWidth={fullWidth}
      disabled={disabled}
      multiline={multiline}
      variant={variant}
      sx={sx}
      defaultValue={defaultValue}
      label={starKeyDisplay.find((k) => k.key === field)?.display}
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
};
