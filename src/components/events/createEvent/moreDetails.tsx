import { useState } from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@mui/material';
import { ChevronLeft, ExpandMore } from '@mui/icons-material';

const MoreDetails = () => {
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
            <TextField fullWidth label="אוק" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="אזורים" />
          </Grid>
          <Grid item xs={4}>
            <TextField fullWidth label="משך" />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default MoreDetails;
