import { useState } from 'react';
import { IEvent } from '../../../types/interfaces';
import {
  ADDITIONAL_EVENT_DETAILS,
  EVENT_FLIGHT_DETAILS,
} from '../../../types/configurations';
import AdditionalDetails from './additionalDetails';

interface Props {
    disabled: boolean;
    isValue: boolean;
    setAttr: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
    event: IEvent;
}

const EventDetails = ({ disabled, isValue, event, setAttr }: Props) => {
  const [displayFlight, setDisplayFlight] = useState<boolean>(true);
  const [displayMore, setDisplayMore] = useState<boolean>(true);

  return (
    <div className="eventDetails">
      <AdditionalDetails
        details={EVENT_FLIGHT_DETAILS}
        event={event}
        disabled={disabled}
        isValue={isValue}
        setAttr={setAttr}
        toggle={displayFlight}
        setToggle={setDisplayFlight}
        toggleLabel="נתוני טיסה"
      />
      <AdditionalDetails
        details={ADDITIONAL_EVENT_DETAILS}
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
