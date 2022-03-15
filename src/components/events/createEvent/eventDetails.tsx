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
  event: IEvent;
  setAttr: (attr: keyof IEvent, value: any) => void;
  currDates: Date[];
  setCurrDates: (param: Date[]) => void;
}

const EventDetails = ({
  register,
  errors,
  event,
  setAttr,
  currDates,
  setCurrDates,
}: DetailsProps) => {
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

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
      <ListGenerator
        header="כללי"
        currList={event.generalSummary ? event.generalSummary : []}
        setCurrList={setAttr}
        attr="generalSummary"
      />
      <ListGenerator
        header="מטרות"
        attr="goals"
        currList={event.goals ? event.goals : []}
        setCurrList={setAttr}
      />
      <ListGenerator
        header="אמצעי איסוף נתונים"
        attr="dataSources"
        currList={event.dataSources ? event.dataSources : []}
        setCurrList={setAttr}
      />
    </div>
  );
};

export default EventDetails;
