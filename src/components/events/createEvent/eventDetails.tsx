import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import {
  Typography,
} from '@mui/material';
import DateRangePicker from './dateRangePicker';
import ListGenerator from '../../general/listGenerator';
import BasicDetails from './basicDetails';
import MoreDetails from './moreDetails';

interface DetailsProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const EventDetails = ({ register, errors }: DetailsProps) => {
  const [isDatePick, setIsDatePick] = useState<boolean>(false);
  const [currDates, setCurrDates] = useState<Date[]>([]);

  return (
    <div className="eventDetails">
      <Typography variant="h5">פרטי האירוע</Typography>
      <BasicDetails
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        register={register}
        errors={errors}
      />
      <DateRangePicker
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        setCurrDates={setCurrDates}
      />
      <MoreDetails />
      <ListGenerator header="כללי" />
      <ListGenerator header="מטרות" />
      <ListGenerator header="אמצעי איסוף נתונים" />
    </div>
  );
};

export default EventDetails;
