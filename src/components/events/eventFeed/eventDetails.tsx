import { IEvent } from '../../../types/interfaces';
import AdditionalDetails from '../additionalDetails';
import FlightDetails from '../flightDetails';

interface EventProps {
    event: IEvent;
}

const EventDetails = ({ event }: EventProps) => (
  <div className="eventDetails">
    <FlightDetails event={event} disabled isValue />
    <AdditionalDetails event={event} disabled isValue />
  </div>
);

export default EventDetails;
