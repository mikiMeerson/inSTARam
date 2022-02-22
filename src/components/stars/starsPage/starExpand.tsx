import { useState } from 'react';
import {
  Grid,
  Button,
  Fab,
  Typography,
} from '@mui/material';
import '../styles/expand.css';
import { NavLink } from 'react-router-dom';
import { ComputerOutlined, DeleteOutline } from '@material-ui/icons';
import DialogAlert from '../../general/dialogAlert';

interface starProps {
  userRole: userRole;
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (star: IStar) => void;
}

const starExpand = ({ userRole, star, setFeed, removeStar }: starProps) => {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

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
          <NavLink to={`/stars/${star._id}`} onClick={() => setFeed(star._id)}>
            <Button variant="contained" sx={{ background: 'goldenrod' }}>
              עבור לעמוד הסטאר
            </Button>
          </NavLink>
          {(userRole !== 'viewer') && (
            <div className="actionButtons">
              <Fab
                size="small"
                id="delete"
                onClick={() => setDeleteAlert(true)}
              >
                <DeleteOutline />
              </Fab>
            </div>
          )}
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
