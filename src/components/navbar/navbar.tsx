import { useState } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import './styles/navbar.css';
import HalfWidthNavbar from './halfWidthNavbar';
import FullWidthNavbar from './fullWidthNavbar';
import UserNavbar from './userNavbar';
import { mainComponents, userRole } from '../../types/string-types';
import { pages } from '../../types/configurations';

interface Props {
  userRole: userRole;
}

const Navbar = ({ userRole }: Props) => {
  const [anchorElNav, setAnchorElNav] = useState();

  return (
    <AppBar
      sx={{
        background: 'goldenrod',
        position: 'static',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HalfWidthNavbar
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
            userRole={userRole}
          />
          <FullWidthNavbar
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
