import {
  TextField,
  Grid,
} from '@mui/material';
import { eventKeyDisplay } from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';

interface EventProps {
    event: IEvent;
}

const EventDetails = ({ event }: EventProps) => (
  <div className="eventDetails">
    <Grid container spacing={4}>
      {[
        'assignee',
        'team',
        'reason',
      ].map((attr) => (
        event[attr as keyof IEvent] && (
        <Grid key={attr} item xs={4}>
          <TextField
            fullWidth
            disabled
            label={eventKeyDisplay.find((k) => k.key === attr)!.display}
            value={event[attr as keyof IEvent]}
          />
        </Grid>
        )
      ))}
    </Grid>
    <Grid container spacing={4}>
      {[
        'callSign',
        'areas',
        'duration',
      ].map((attr) => (
        event[attr as keyof IEvent] && (
        <Grid item xs={4}>
          <TextField
            fullWidth
            disabled
            label={eventKeyDisplay.find((k) => k.key === attr)!.display}
            value={event[attr as keyof IEvent]}
          />
        </Grid>
        )))}
    </Grid>
  </div>
);

export default EventDetails;
