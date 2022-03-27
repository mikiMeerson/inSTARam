import { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Typography, Button } from '@mui/material';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';
import DateRangePicker from './dateRangePicker';
import BasicDetails from './basicDetails';
import { IEvent } from '../../../types/interfaces';
import AdditionalDetails from '../commonEventFields/additionalDetails';

interface DetailsProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
  setAttr: (attr: keyof IEvent, value: any) => void;
  currDates: Date[];
  setCurrDates: (param: Date[]) => void;
}

const EventDetails = ({
  register,
  errors,
  setAttr,
  currDates,
  setCurrDates,
}: DetailsProps) => {
  const [isDatePick, setIsDatePick] = useState<boolean>(false);
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  return (
    <div className="eventDetails">
      <Typography variant="h5">פרטי האירוע</Typography>
      <BasicDetails
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        register={register}
        errors={errors}
        setAttr={setAttr}
      />
      <div className="moreDetails">
        <Button color="info" onClick={() => setDisplayMore(!displayMore)}>
          { displayMore ? (
            <ExpandMore />
          ) : (
            <>
              <span>פרטים נוספים</span>
              <ChevronLeft />
            </>
          ) }
        </Button>
        {displayMore && (
          <AdditionalDetails
            disabled={false}
            isValue={false}
            setAttr={setAttr}
          />
        )}
      </div>
      <DateRangePicker
        isDatePick={isDatePick}
        setIsDatePick={setIsDatePick}
        currDates={currDates}
        setCurrDates={setCurrDates}
      />
    </div>
  );
};

export default EventDetails;
