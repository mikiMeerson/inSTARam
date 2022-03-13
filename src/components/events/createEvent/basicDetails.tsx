import { FieldValues, UseFormRegister } from 'react-hook-form';
import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { BLOCKS, EVENT_TYPES, PLATFORMS } from '../../../assets';
import SelectField from '../../general/selectField';

interface DetailsProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    currDates: Date[];
    register: UseFormRegister<FieldValues>;
    errors: any;
}

const BasicDetails = ({
  isDatePick,
  setIsDatePick,
  currDates,
  register,
  errors,
}: DetailsProps) => {
  const getDisplayDate = (date: Date) => `
  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  `;

  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <TextField
            id="eventName"
            variant="standard"
            fullWidth
            label="שם האירוע"
            sx={{ fontSize: '150%' }}
            {...register('name')}
            error={errors.name}
          />
          <Typography color="textSecondary">
            {errors.name?.message}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <SelectField
            element="event"
            field="platform"
            variant="outlined"
            fieldValues={PLATFORMS}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            element="event"
            field="block"
            variant="outlined"
            fieldValues={BLOCKS}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={3}>
          <SelectField
            element="event"
            field="type"
            variant="outlined"
            fieldValues={EVENT_TYPES}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField fullWidth variant="outlined" label="מטס" />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="גוף מבצע"
            {...register('assignee')}
            error={errors.assignee}
          />
          <Typography color="textSecondary">
            {errors.assignee?.message}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="צוות" />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="תאריכים"
            sx={{ width: '100%' }}
            onClick={() => setIsDatePick(!isDatePick)}
            value={
              currDates.length > 0
                ? `
                ${getDisplayDate(currDates[1])}-${getDisplayDate(currDates[0])
                }`
                : ''
              }
            {...register('dates')}
            error={errors.dates}
          />
          <Typography color="textSecondary">
            {errors.dates?.message}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default BasicDetails;
