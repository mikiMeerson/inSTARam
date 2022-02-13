import { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import '../styles/expand.css';
import { NavLink } from 'react-router-dom';
import { ComputerOutlined, DeleteOutline } from '@material-ui/icons';
import { authorizeUser } from '../../../services/user-service';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (star: IStar) => void;
}

const starExpand = ({ star, setFeed, removeStar }: starProps) => {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  useEffect(() => {
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
  }, []);

  return (
    <>
      <div className="starExpand">
        <Grid container>
          <Typography variant="caption" fontSize="13px">
            הועלה על ידי
            {' '}
            <span style={{ color: 'crimson' }}>{star.publisher}</span>
            {' '}
            מתוך
            {' '}
            <span style={{ color: 'cornflowerblue' }}>{star.event}</span>
            {' '}
          </Typography>
        </Grid>
        <Grid
          container
          sx={{
            border: '1px solid silver',
            borderRadius: '2%',
            height: '30%',
            padding: '15px',
            margin: '2% 0 2% 0',
          }}
        >
          <Typography>{star.desc}</Typography>
        </Grid>
        <Grid container sx={{ marginBottom: '2%' }}>
          <ComputerOutlined fontSize="small" />
          <Typography
            variant="caption"
            fontSize="13px"
            marginRight="5px"
          >
            {star.computer}
          </Typography>
        </Grid>
        <div className="starActions">
          <NavLink to={`/star/${star._id}`} onClick={() => setFeed(star._id)}>
            <Button variant="contained" sx={{ background: 'goldenrod' }}>
              עבור לעמוד הסטאר
            </Button>
          </NavLink>
          <div
            className="actionButtons"
            style={{ display: isEditor ? '' : 'none' }}
          >
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
