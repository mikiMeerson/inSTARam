import { BaseSyntheticEvent } from 'react';
import { StarOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography, Box, MenuItem, Menu } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { LinkDisplayType } from '../../types/configurations';
import { UserRole } from '../../types/string-types';

interface Props {
  pages: LinkDisplayType[];
  setAnchorElNav: (param: any) => void;
  anchorElNav: any;
  userRole: UserRole;
}

const HalfWidthNavBar = ({
  pages,
  anchorElNav,
  setAnchorElNav,
  userRole,
}: Props) => (
  <>
    <Link to="/">
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        <StarOutline fontSize="large" htmlColor="white" />
      </Typography>
    </Link>

    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-haspopup="true"
        onClick={(
          e: BaseSyntheticEvent,
        ) => {
          setAnchorElNav(e.currentTarget);
        }}
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
        onClose={() => setAnchorElNav(undefined)}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages
          .filter((page) => page.role === 'viewer'
            || userRole === page.role || userRole === 'admin')
          .map((page: LinkDisplayType) => (
            <NavLink to={page.link} key={page.display}>
              <MenuItem
                onClick={() => setAnchorElNav(undefined)}
              >
                <Typography textAlign="center">{page.display}</Typography>
              </MenuItem>
            </NavLink>
          ))}
      </Menu>
    </Box>
  </>
);

export default HalfWidthNavBar;
