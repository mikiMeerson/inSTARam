import { Grid, TextField, Button } from '@mui/material';
import { ExpandMore, ChevronLeft } from '@mui/icons-material';
import { IEvent } from '../../../types/interfaces';
import { EVENT_KEY_DISPLAY } from '../../../types/configurations';

interface Props {
  details: (keyof IEvent)[],
  disabled: boolean;
  isValue: boolean;
  toggle: boolean;
  setToggle: (param: boolean) => void;
  toggleLabel: string;
  setAttr: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
  event: IEvent;
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
}: Props) => (
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
        <Grid key={attr} item xs={4}>
          <TextField
            fullWidth
            disabled={disabled}
            label={EVENT_KEY_DISPLAY.find((k) => k.key === attr)!.display}
            defaultValue={isValue ? event[attr] : ''}
            onChange={(e) => setAttr(attr, e.target.value)}
          />
        </Grid>
      ))}
    </Grid>
    )}
  </div>
);

export default AdditionalDetails;
