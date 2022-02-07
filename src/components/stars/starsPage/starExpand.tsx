import { useState } from 'react';
import {
  TextField,
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import '../styles/expand.css';
import { NavLink } from 'react-router-dom';
import { DeleteOutline } from '@material-ui/icons';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (star: IStar) => void;
}

interface fieldType {
  row: number,
  label: string,
  defaultValue: string,
  isMultiline: boolean,
  width: string,
  variant: 'standard' | 'outlined' | 'filled';
}

const starExpand = ({ star, setFeed, removeStar }: starProps) => {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const fields: fieldType[] = [
    {
      row: 1,
      label: 'הועלה על ידי',
      defaultValue: star.publisher,
      isMultiline: false,
      width: '45%',
      variant: 'standard',
    },
    {
      row: 1,
      label: 'אירוע',
      defaultValue: star.event,
      isMultiline: false,
      width: '45%',
      variant: 'standard',
    },
    {
      row: 2,
      label: 'תיאור',
      defaultValue: star.desc,
      isMultiline: true,
      width: '100%',
      variant: 'outlined',
    },
    {
      row: 3,
      label: 'מחשב',
      defaultValue: star.computer ? star.computer : '',
      isMultiline: false,
      width: '30%',
      variant: 'standard',
    },
  ];
  return (
    <>
      <div className="starExpand">
        {Array.from(new Set(fields.map((f) => f.row)))
          .map((row) => (
            <div key={row} className="dataRow" style={{ width: '100%' }}>
              {fields
                .filter((f) => f.row === row)
                .map((field) => (
                  <TextField
                    key={field.label}
                    disabled
                    sx={{ width: field.width, margin: '7px' }}
                    label={field.label}
                    defaultValue={field.defaultValue}
                    multiline={field.isMultiline}
                    variant={field.variant}
                  />
                ))}
            </div>
          ))}
        <div className="starActions">
          <NavLink to={`/star/${star._id}`} onClick={() => setFeed(star._id)}>
            <Button variant="contained" sx={{ background: 'goldenrod' }}>
              עבור לעמוד הסטאר
            </Button>
          </NavLink>
          <div className="actionButtons">
            <Fab size="small" id="delete" onClick={() => setDeleteAlert(true)}>
              <DeleteOutline />
            </Fab>
          </div>
        </div>
      </div>
      <Dialog
        open={deleteAlert}
        onClose={() => setDeleteAlert(false)}
      >
        <DialogTitle dir="rtl">
          למחוק את הסטאר?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            כל פרטי הסטאר והפעילות שנעשתה בו יימחקו לצמיתות
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAlert(false)}>בטל</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setDeleteAlert(false);
              removeStar(star);
            }}
            autoFocus
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default starExpand;
