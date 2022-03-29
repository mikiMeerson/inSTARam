import { StarOutline } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { linkDisplayType } from '../../types/configurations';
import { userRole, mainComponents } from '../../types/string-types';

interface NavbarProps {
  pages: linkDisplayType[];
  setAnchorElNav: (param: any) => void;
  userRole: userRole;
}

const FullWidthNavbar = ({
  pages,
  setAnchorElNav,
  userRole,
}: NavbarProps) => (
  <>
    <Link to="/">
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        <StarOutline fontSize="large" htmlColor="white" />
      </Typography>
    </Link>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages
        .filter((p) => p.role === 'viewer'
        || userRole === p.role || userRole === 'admin')
        .map((page: linkDisplayType) => (
          <NavLink to={page.link} key={page.link}>
            <Button
              key={page.display}
              onClick={() => setAnchorElNav(undefined)}
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
  </>
);

export default FullWidthNavbar;
