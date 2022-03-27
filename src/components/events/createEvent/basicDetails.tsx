import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import SelectField from '../../general/selectField';
import DateRangePicker from './dateRangePicker';
import { BLOCKS, EVENT_TYPES } from '../../../types/enums';

interface DetailsProps {
    currDates: Date[];
    setCurrDates: (param: Date[]) => void;
    register: UseFormRegister<FieldValues>;
    errors: any;
}

const BasicDetails = ({
  currDates,
  setCurrDates,
  register,
  errors,
}: DetailsProps) => {
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

  const getDisplayDate = (date: Date) => `
  ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
  `;

  return (
    <div className="eventDetails">
      <Typography variant="h5">פרטי האירוע</Typography>
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
        <Grid item xs={4}>
          <SelectField
            element="event"
            field="block"
            variant="outlined"
            fieldValues={BLOCKS}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={4}>
          <SelectField
            element="event"
            field="type"
            variant="outlined"
            fieldValues={EVENT_TYPES}
            register={register}
            errors={errors}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="תאריכים"
            sx={{ width: '100%', paddingLeft: 0, marginLeft: '15px' }}
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
      <DateRangePicker
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        setCurrDates={setCurrDates}
      />
    </div>
  );
};

export default BasicDetails;
