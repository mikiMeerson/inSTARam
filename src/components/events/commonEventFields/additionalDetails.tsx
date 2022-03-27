import { Grid, TextField, Button } from '@mui/material';
import { ExpandMore, ChevronLeft } from '@mui/icons-material';
import { IEvent } from '../../../types/interfaces';
import { eventKeyDisplay } from '../../../types/configurations';

interface DetailsProps {
  details: string[],
  disabled: boolean;
  isValue: boolean;
  toggle: boolean;
  setToggle: (param: boolean) => void;
  toggleLabel: string;
  event?: IEvent;
  setAttr?: (attr: keyof IEvent, value: any) => void;
}

const AdditionalDetails = ({
  details,
  disabled,
  isValue,
  toggle,
  setToggle,
  toggleLabel,
  event,
  setAttr,
}: DetailsProps) => (
  <div className="moreDetails">
    <Button color="info" onClick={() => setToggle(!toggle)}>
      {toggle ? <ExpandMore /> : (
        <>
          <span>{toggleLabel}</span>
          <ChevronLeft />
        </>
      )}
    </Button>
    {toggle && (
    <Grid container spacing={4}>
      {details.map((attr) => (
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
    )}
  </div>
);

export default AdditionalDetails;

AdditionalDetails.defaultProps = {
  event: undefined,
  setAttr: undefined,
};
