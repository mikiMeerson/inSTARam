import { useEffect, BaseSyntheticEvent, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { StarOutline } from '@material-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import './styles/navbar.css';
import { logout, authorizeUser } from '../../services/user-service';

type linkDisplayType = {
  display: string;
  link: string;
  role: userRole;
};

const pages: linkDisplayType[] = [
  { display: 'סטארים', link: '/stars', role: 'viewer' },
  { display: 'גיחות', link: '/flights', role: 'viewer' },
  { display: 'משתמשים', link: '/users', role: 'admin' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const ac = new AbortController();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    authorizeUser('admin').then((res: boolean) => setIsAdmin(res));
    return () => ac.abort();
  }, []);
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(undefined);
  };

  return (
    <AppBar position="static" sx={{ background: 'goldenrod' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <StarOutline fontSize="large" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={(
                e: BaseSyntheticEvent,
              ) => setAnchorElNav(e.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages
                .filter((p) => p.role === 'viewer'
                  || isAdmin
                  || (p.role === 'editor' && isEditor))
                .map((page: linkDisplayType, index) => (
                  <NavLink to={page.link} key={index}>
                    <MenuItem key={page.display} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.display}</Typography>
                    </MenuItem>
                  </NavLink>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <StarOutline fontSize="large" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages
              .filter((p) => p.role === 'viewer'
                || isAdmin
                || (p.role === 'editor' && isEditor))
              .map((page: linkDisplayType) => (
                <NavLink to={page.link} key={page.link}>
                  <Button
                    key={page.display}
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      fontSize: 'large',
                      color: 'white',
                      display: 'block',
                      marginRight: '15px',
                    }}
                  >
                    {page.display}
                  </Button>
                </NavLink>
              ))}
          </Box>
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseNavMenu;
                logout();
                navigate('/login');
                window.location.reload();
              }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
