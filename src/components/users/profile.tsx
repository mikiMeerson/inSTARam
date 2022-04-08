import { StatusCodes } from 'http-status-codes';
import { useEffect, useState } from 'react';
import {
  AccountCircle,
  VisibilityOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableRow,
  TableCell,
} from '@mui/material';
import './styles/profile.css';
import NewActivity from './newActivity';
import UserWatch from './userWatch';
import { getStars } from '../../services/star-service';
import { IStar } from '../../types/interfaces';

const Profile = () => {
  const [viewWatchList, setViewWatchList] = useState<boolean>(false);
  const [userWatchList, setUserWatchList] = useState<IStar[]>();

  const getWatchedStars = async () => {
    const currUserStr = localStorage.getItem('user');
    if (currUserStr) {
      const idWatchList = JSON.parse(currUserStr).watchList;
      const { status, data } = await getStars(); // !implement smart fetching
      if (status === StatusCodes.OK) {
        setUserWatchList(
          data.stars.filter((star) => idWatchList.includes(star._id)),
        );
      } else console.log('Could not fetch the watch list');
    }
  };
  useEffect(() => {
    getWatchedStars();
  }, []);

  return (
    <>
      <div className="profileHeader">
        <Avatar sx={{ width: '150px', height: '150px' }}>
          <AccountCircle sx={{ width: '150px', height: '150px' }} />
        </Avatar>
        <div className="userInfo">
          <Typography variant="h4">
            {localStorage.getItem('userDisplay')}
          </Typography>
          <div className="userDetails">
            <Button
              variant="outlined"
              size="large"
              color="warning"
              onClick={() => setViewWatchList(true)}
            >
              <VisibilityOutlined />
              <span className="buttonText">רשימת הצפייה שלך</span>
            </Button>
            <Button variant="outlined" size="large" color="info">
              <AssignmentOutlined />
              <span className="buttonText">הפעילות שלך</span>
            </Button>
          </div>
          <div>
            <Typography variant="subtitle1">
              לשינוי הפרטים האישיים
              {' '}
              <Button variant="text" color="secondary">
                לחץ כאן
              </Button>
            </Typography>
          </div>
        </div>
      </div>
      <div className="profileWindows">
        <UserWatch />
        <NewActivity />
      </div>
      <Dialog
        open={viewWatchList}
        onClose={() => setViewWatchList(false)}
      >
        <DialogTitle dir="rtl">
          <Typography>רשימת הצפייה שלך</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Table>
              {userWatchList?.map((watch) => (
                <TableRow>
                  <TableCell>
                    {watch.name}
                  </TableCell>
                  <TableCell>
                    <VisibilityOutlined />
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
