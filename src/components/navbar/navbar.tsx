import { useState } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import './styles/navbar.css';
import FullWidthNavbar from './halfWidthNavbar';
import HalfWidthNavbar from './fullWidthNavbar';
import UserNavbar from './userNavbar';

const pages: linkDisplayType[] = [
  { display: 'סטארים', link: '/stars', role: 'viewer' },
  { display: 'גיחות', link: '/events', role: 'viewer' },
  { display: 'משתמשים', link: '/users', role: 'admin' },
];

interface NavbarProps {
  userRole: userRole;
}

const Navbar = ({ userRole }: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = useState();

  return (
    <AppBar position="static" sx={{ background: 'goldenrod' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FullWidthNavbar
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
            userRole={userRole}
          />
          <HalfWidthNavbar
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            userRole={userRole}
          />
          <UserNavbar setAnchorElNav={setAnchorElNav} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
