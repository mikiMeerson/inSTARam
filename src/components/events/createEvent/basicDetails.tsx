import { FieldValues, UseFormRegister } from 'react-hook-form';
import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import SelectField from '../../general/selectField';
import { BLOCKS, EVENT_TYPES } from '../../../types/enums';
import { IEvent } from '../../../types/interfaces';
import FlightDetails from '../commonEventFields/flightDetails';

interface DetailsProps {
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    currDates: Date[];
    register: UseFormRegister<FieldValues>;
    errors: any;
    setAttr: (attr: keyof IEvent, value: any) => void;
}

const BasicDetails = ({
  isDatePick,
  setIsDatePick,
  currDates,
  register,
  errors,
  setAttr,
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
      <FlightDetails isValue={false} disabled={false} setAttr={setAttr} />
    </>
  );
};

export default BasicDetails;
