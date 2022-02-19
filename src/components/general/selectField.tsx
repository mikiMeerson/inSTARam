import {
  Select,
  Input,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { starKeyDisplay } from '../../assets/utils';

const SelectField = ({ field, fieldValues, register, errors }: any) => (
  <>
    <FormControl sx={{ width: '100%' }}>
      <InputLabel>
        {starKeyDisplay.find((k) => k.key === field)?.display}
      </InputLabel>
      <Select
        variant="outlined"
        input={<Input />}
        {...register(field)}
        error={errors[field]}
      >
        {fieldValues.map((value: string) => (
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
