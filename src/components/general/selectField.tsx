import {
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { UseFormRegister } from 'react-hook-form';
import { starKeyDisplay } from '../../assets';

interface fieldProps {
  field: keyof IStar;
  fieldValues: any;
  register: UseFormRegister<any>;
  errors: {[x: string]: any};
  defaultValue?: string;
  disabled?: boolean;
}

const SelectField = ({
  field,
  fieldValues,
  register,
  errors,
  defaultValue,
  disabled,
}: fieldProps) => (
  <>
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>
        {starKeyDisplay.find((k) => k.key === field)?.display}
      </InputLabel>
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        variant="outlined"
        input={<Input />}
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
};
