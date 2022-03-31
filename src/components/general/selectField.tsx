import {
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
} from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import {
  EVENT_KEY_DISPLAY,
  STAR_KEY_DISPLAY,
} from '../../types/configurations';
import { IEvent, IStar } from '../../types/interfaces';

interface Props {
  field: keyof IStar | keyof IEvent;
  fieldValues: string[];
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
}: Props) => (
  <>
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>
        {element === 'star'
          ? STAR_KEY_DISPLAY.find((k) => k.key === field)?.display
          : EVENT_KEY_DISPLAY.find((k) => k.key === field)?.display}
      </InputLabel>
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        variant="outlined"
        input={variant === 'standard' ? <Input /> : <OutlinedInput />}
        {...register(field)}
        error={errors[field]}
      >
        {fieldValues.map((value) => (
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
