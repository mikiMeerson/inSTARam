import { useState, BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Typography,
  Tooltip,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { logout } from '../../services/user-service';

interface NavbarProps {
  setAnchorElNav: (param: any) => void;
}

const UserNavbar = ({ setAnchorElNav }: NavbarProps) => {
  const [anchorElUser, setAnchorElUser] = useState();
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" sx={{ paddingLeft: '15px' }}>
        {localStorage.getItem('userDisplay')}
      </Typography>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton
            onClick={
              (e: BaseSyntheticEvent) => setAnchorElUser(e.currentTarget)
            }
            sx={{ p: 0 }}
          >
            <Avatar><AccountCircle fontSize="large" /></Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(undefined)}
        >
          <Link to="/profile">
            <MenuItem onClick={() => {
              setAnchorElNav(undefined);
              setAnchorElUser(undefined);
            }}
            >
              <Typography textAlign="center">Profile</Typography>
            </MenuItem>
          </Link>
          <MenuItem onClick={() => {
            setAnchorElNav(undefined);
            setAnchorElUser(undefined);
            logout();
            navigate('/login');
            window.location.reload();
          }}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserNavbar;
