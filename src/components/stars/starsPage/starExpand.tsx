import { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Fab,
  Typography,
} from '@mui/material';
import '../styles/expand.css';
import { NavLink } from 'react-router-dom';
import { ComputerOutlined, DeleteOutline } from '@material-ui/icons';
import { authorizeUser } from '../../../services/user-service';
import DialogAlert from '../../general/dialogAlert';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (star: IStar) => void;
}

const starExpand = ({ star, setFeed, removeStar }: starProps) => {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  useEffect(() => {
    const ac = new AbortController();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    return () => ac.abort();
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
      <DialogAlert
        header="למחוק את הסטאר?"
        content="כל פרטי הסטאר והפעילות שנעשתה בו יימחקו לצמיתות"
        isOpen={deleteAlert}
        setIsOpen={setDeleteAlert}
        activateResponse={removeStar}
        param={star}
      />
    </>
  );
};

export default starExpand;
