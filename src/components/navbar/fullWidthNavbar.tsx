import { StarOutline } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { LinkDisplayType } from '../../types/configurations';
import { UserRole, MainComponents } from '../../types/string-types';

interface Props {
  pages: LinkDisplayType[];
  setAnchorElNav: (param: any) => void;
  userRole: UserRole;
}

const FullWidthNavbar = ({
  pages,
  setAnchorElNav,
  userRole,
}: Props) => (
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
        .map((page: LinkDisplayType) => (
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
