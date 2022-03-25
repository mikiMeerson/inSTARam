import { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';
import { IEvent } from '../../../types/interfaces';

interface DetailsProps {
  setAttr: (attr: keyof IEvent, value: any) => void;
}

const MoreDetails = ({ setAttr }: DetailsProps) => {
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  return (
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
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="אוק"
              onChange={(e) => setAttr('callSign', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="אזורים"
              onChange={(e) => setAttr('areas', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="משך"
              onChange={(e) => setAttr('duration', e.target.value)}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MoreDetails;
