import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import './styles/navbar.css';
import { authorizeUser } from '../../services/user-service';
import FullWidthNavbar from './fullWidthNavbar';
import HalfWidthNavbar from './halfWidthNavbar';
import UserNavbar from './userNavbar';

const pages: linkDisplayType[] = [
  { display: 'סטארים', link: '/stars', role: 'viewer' },
  { display: 'גיחות', link: '/flights', role: 'viewer' },
  { display: 'משתמשים', link: '/users', role: 'admin' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState();
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const ac = new AbortController();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    authorizeUser('admin').then((res: boolean) => setIsAdmin(res));
    return () => ac.abort();
  }, []);

  return (
    <AppBar position="static" sx={{ background: 'goldenrod' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FullWidthNavbar
            pages={pages}
            anchorElNav={anchorElNav}
            setAnchorElNav={setAnchorElNav}
            isAdmin={isAdmin}
            isEditor={isEditor}
          />
          <HalfWidthNavbar
            pages={pages}
            setAnchorElNav={setAnchorElNav}
            isAdmin={isAdmin}
            isEditor={isEditor}
          />
          <UserNavbar setAnchorElNav={setAnchorElNav} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
