import { Grid, TextField } from '@mui/material';
import { IEvent } from '../../types/interfaces';
import {
  additionalEventDetails,
  eventKeyDisplay,
} from '../../types/configurations';

interface DetailsProps {
    disabled: boolean;
    isValue: boolean;
    event?: IEvent;
    setAttr?: (attr: keyof IEvent, value: any) => void;
}

const AdditionalDetails = ({
  disabled,
  isValue,
  event,
  setAttr,
}: DetailsProps) => (
  <Grid container spacing={4}>
    {additionalEventDetails.map((attr) => (
      <Grid item xs={4}>
        <TextField
          fullWidth
          disabled={disabled}
          label={eventKeyDisplay.find((k) => k.key === attr)!.display}
          defaultValue={(isValue && event) ? event[attr as keyof IEvent] : ''}
          onChange={(e) => setAttr
            && setAttr(attr as keyof IEvent, e.target.value)}
        />
      </Grid>
    ))}
  </Grid>
);

export default AdditionalDetails;

AdditionalDetails.defaultProps = {
  event: undefined,
  setAttr: undefined,
};
