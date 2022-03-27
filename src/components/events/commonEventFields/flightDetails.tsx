import { Grid, TextField } from '@mui/material';
import {
  eventFlightDetails,
  eventKeyDisplay,
} from '../../../types/configurations';
import { IEvent } from '../../../types/interfaces';

interface DetailsProps {
    isValue: boolean;
    disabled: boolean;
    event?: IEvent;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const FlightDetails = ({
  disabled,
  isValue,
  event,
  setAttr,
}: DetailsProps) => (
  <Grid container spacing={4}>
    {eventFlightDetails.map((attr) => (
      <Grid key={attr} item xs={4}>
        <TextField
          fullWidth
          disabled={disabled}
          label={
              eventKeyDisplay.find((k) => k.key === attr)?.display || 'שגיאה'
            }
          defaultValue={(isValue && event) ? event[attr as keyof IEvent] : ''}
          onChange={(e) => setAttr && (
            setAttr(attr as keyof IEvent, e.target.value)
          )}
        />
      </Grid>
    ))}
  </Grid>
);

export default FlightDetails;

FlightDetails.defaultProps = {
  event: undefined,
  setAttr: undefined,
};
