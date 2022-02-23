import {
  AccountCircle,
  VisibilityOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import { Avatar, Typography, Button } from '@mui/material';
import './styles/profile.css';
import NewActivity from './newActivity';
import UserWatch from './userWatch';

const Profile = () => (
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
          <Button variant="outlined" size="large" color="warning">
            <VisibilityOutlined />
            <span className="buttonText">דפים שאתה צופה בהם</span>
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
  </>
);

export default Profile;
