/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Container } from '@mui/material';
import './styles/navbar.css';
import HalfWidthNavbar from './halfWidthNavbar';
import FullWidthNavbar from './fullWidthNavbar';
import UserNavbar from './userNavbar';
import { MainComponents, UserRole } from '../../types/string-types';
import { pages } from '../../types/configurations';

interface Props {
  userRole: UserRole;
}

const Navbar = ({ userRole }: Props) => {
  const [anchorElNav, setAnchorElNav] = useState();
  const url = useLocation();
  const [currComponent, setCurrComponent] = useState<MainComponents>('home');

  useEffect(() => {
    if (url.pathname.includes('stars')) setCurrComponent('stars');
    else if (url.pathname.includes('events')) setCurrComponent('events');
    else if (url.pathname.includes('users')) setCurrComponent('users');
    else setCurrComponent('home');
  }, [url]);

  return (
    <AppBar
      sx={currComponent === 'home' ? {
        background: 'transparent',
        position: 'fixed',
      } : currComponent === 'stars' ? {
        background: 'goldenrod',
        position: 'static',
      } : currComponent === 'events' ? {
        background: 'purple',
        position: 'static',
      } : {
        background: 'blue',
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
