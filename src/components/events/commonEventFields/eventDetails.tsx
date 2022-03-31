import { useState } from 'react';
import { IEvent } from '../../../types/interfaces';
import {
  additionalEventDetails,
  eventFlightDetails,
} from '../../../types/configurations';
import AdditionalDetails from './additionalDetails';

interface Props {
    disabled: boolean;
    isValue: boolean;
    setAttr: (attr: keyof IEvent, value: any) => void;
    event: IEvent;
}

const EventDetails = ({ disabled, isValue, event, setAttr }: Props) => {
  const [displayFlight, setDisplayFlight] = useState<boolean>(false);
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  return (
    <div className="eventDetails">
      <AdditionalDetails
        details={eventFlightDetails}
        event={event}
        disabled={disabled}
        isValue={isValue}
        setAttr={setAttr}
        toggle={displayFlight}
        setToggle={setDisplayFlight}
        toggleLabel="נתוני טיסה"
      />
      <AdditionalDetails
        details={additionalEventDetails}
        event={event}
        disabled={disabled}
        isValue={isValue}
        setAttr={setAttr}
        toggle={displayMore}
        setToggle={setDisplayMore}
        toggleLabel="פרטים נוספים"
      />
    </div>
  );
};

export default EventDetails;
