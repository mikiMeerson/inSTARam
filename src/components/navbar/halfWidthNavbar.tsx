import { StarOutline } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
    pages: linkDisplayType[];
    setAnchorElNav: (param: any) => void;
    isAdmin: boolean;
    isEditor: boolean;
}

const HalfWidthNavbar = ({
  pages,
  setAnchorElNav,
  isAdmin,
  isEditor,
}: NavbarProps) => (
  <>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
    >
      <StarOutline fontSize="large" />
    </Typography>
    ,
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages
        .filter((p) => p.role === 'viewer'
                    || isAdmin
                    || (p.role === 'editor' && isEditor))
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

export default HalfWidthNavbar;
