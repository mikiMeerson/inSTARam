import {
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
} from '@mui/material';
import _ from 'lodash';
import { UseFormRegister } from 'react-hook-form';
import { eventKeyDisplay, starKeyDisplay } from '../../types/configurations';
import { IEvent, IStar } from '../../types/interfaces';

interface fieldProps {
  field: keyof IStar | keyof IEvent;
  fieldValues: any;
  register: UseFormRegister<any>;
  errors: {[x: string]: any};
  defaultValue?: any;
  disabled?: boolean;
  element?: 'star' | 'event';
  variant?: 'outlined' | 'standard';
}

const SelectField = ({
  field,
  fieldValues,
  register,
  errors,
  defaultValue,
  disabled,
  element,
  variant,
}: fieldProps) => (
  <>
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>
        {element === 'star'
          ? starKeyDisplay.find((k) => k.key === field)?.display
          : eventKeyDisplay.find((k) => k.key === field)?.display}
      </InputLabel>
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        variant="outlined"
        input={variant === 'standard' ? <Input /> : <OutlinedInput />}
        {...register(field)}
        error={errors[field]}
      >
        {_.map(fieldValues, (value: string) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <Typography variant="inherit" color="textSecondary">
      {errors[field]?.message}
    </Typography>
  </>
);

export default SelectField;

SelectField.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  element: 'star',
  variant: 'standard',
};
