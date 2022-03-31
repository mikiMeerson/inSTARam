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
import { IEvent, IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import StarDescLine from '../starDescLine';

interface Props {
  userRole: UserRole;
  star: IStar;
  removeStar: (star: IStar) => void;
  event: IEvent | undefined;
}

const starExpand = ({ userRole, star, removeStar, event }: Props) => {
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);

  return (
    <>
      <div className="starExpand">
        <Grid container>
          <StarDescLine star={star} event={event} />
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
          <NavLink to={`/stars/${star._id}`}>
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
