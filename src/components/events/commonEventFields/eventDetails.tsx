import { useState } from 'react';
import { IEvent } from '../../../types/interfaces';
import {
  additionalEventDetails,
  eventFlightDetails,
} from '../../../types/configurations';
import AdditionalDetails from './additionalDetails';

interface EventProps {
    disabled: boolean;
    isValue: boolean;
    event?: IEvent;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const EventDetails = ({ disabled, isValue, event, setAttr }: EventProps) => {
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

EventDetails.defaultProps = {
  event: undefined,
  setAttr: undefined,
};
