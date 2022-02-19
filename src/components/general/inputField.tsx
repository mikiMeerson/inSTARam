import { TextField, Typography } from '@mui/material';
import { starKeyDisplay } from '../../assets/utils';

const InputField = ({ field, register, errors }: any) => (
  <>
    <TextField
      fullWidth
      label={starKeyDisplay.find((k) => k.key === field)?.display}
      variant="standard"
      {...register(field)}
      error={errors[field]}
    />
    <Typography variant="inherit" color="textSecondary">
      {errors[field]?.message}
    </Typography>
  </>
);

export default InputField;
