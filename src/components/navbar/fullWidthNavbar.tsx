import { BaseSyntheticEvent } from 'react';
import { StarOutline } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Typography, Box, MenuItem, Menu } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
    pages: linkDisplayType[];
    setAnchorElNav: (param: any) => void;
    anchorElNav: any;
    isAdmin: boolean;
    isEditor: boolean;
}

const FullWidthNavBar = ({
  pages,
  anchorElNav,
  setAnchorElNav,
  isAdmin,
  isEditor,
}: NavbarProps) => (
  <>
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
                  || isAdmin
                  || (p.role === 'editor' && isEditor))
          .map((page: linkDisplayType, index) => (
            <NavLink to={page.link} key={index}>
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

export default FullWidthNavBar;
