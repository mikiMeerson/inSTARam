import { BaseSyntheticEvent } from 'react';
import { StarOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography, Box, MenuItem, Menu } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { linkDisplayType } from '../../types/configurations';
import { mainComponents, userRole } from '../../types/string-types';

interface NavbarProps {
  pages: linkDisplayType[];
  setAnchorElNav: (param: any) => void;
  anchorElNav: any;
  userRole: userRole;
  setCurrNavbar: (param: mainComponents) => void;
}

const HalfWidthNavBar = ({
  pages,
  anchorElNav,
  setAnchorElNav,
  userRole,
  setCurrNavbar,
}: NavbarProps) => (
  <>
    <Link to="/" onClick={() => setCurrNavbar('home')}>
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
          .filter((p) => p.role === 'viewer'
            || userRole === p.role || userRole === 'admin')
          .map((page: linkDisplayType, index) => (
            <NavLink
              to={page.link}
              key={index}
              onClick={() => setCurrNavbar(
                page.link.substring(1) as mainComponents,
              )}
            >
              <MenuItem
                key={page.display}
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
