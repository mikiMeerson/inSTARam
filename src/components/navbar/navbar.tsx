import { useState } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import './styles/navbar.css';
import HalfWidthNavbar from './halfWidthNavbar';
import FullWidthNavbar from './fullWidthNavbar';
import UserNavbar from './userNavbar';
import { mainComponents, userRole } from '../../types/string-types';
import { pages } from '../../types/configurations';

interface NavbarProps {
  userRole: userRole;
  currNavbar: mainComponents;
  setCurrNavbar: (param: mainComponents) => void;
}

const Navbar = ({ userRole, currNavbar, setCurrNavbar }: NavbarProps) => {
  const [anchorElNav, setAnchorElNav] = useState();

  const navbarColors = {
    stars: 'goldenrod',
    events: 'purple',
    users: 'blue',
    home: 'transparent',
  };

  return (
    <AppBar
      sx={{
        background: navbarColors[currNavbar],
        position: currNavbar === 'home' ? 'fixed' : 'static',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HalfWidthNavbar
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
            userRole={userRole}
            setCurrNavbar={setCurrNavbar}
          />
          <FullWidthNavbar
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            userRole={userRole}
            setCurrNavbar={setCurrNavbar}
          />
          <UserNavbar setAnchorElNav={setAnchorElNav} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
