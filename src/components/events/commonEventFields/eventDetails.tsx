import { useState } from 'react';
import { Button } from '@mui/material';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';
import { IEvent } from '../../../types/interfaces';
import AdditionalDetails from './additionalDetails';
import FlightDetails from './flightDetails';

interface EventProps {
    disabled: boolean;
    isValue: boolean;
    event?: IEvent;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const EventDetails = ({ disabled, isValue, event, setAttr }: EventProps) => {
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  return (
    <div className="eventDetails">
      <FlightDetails event={event} disabled={disabled} isValue={isValue} />
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
            event={event}
            disabled={disabled}
            isValue={isValue}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetails;

EventDetails.defaultProps = {
  event: undefined,
  setAttr: undefined,
};
