import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Star, Flight, Person } from '@mui/icons-material';
import '../components/home/home.css';
import { UserRole } from '../types/string-types';
import { LinkDisplayType, pages } from '../types/configurations';

const linkToIcon = [
  {
    link: '/stars',
    icon: <Star className="pageIcon" />,
  },
  {
    link: '/events',
    icon: <Flight className="pageIcon" />,
  },
  {
    link: '/users',
    icon: <Person className="pageIcon" />,
  },
];

interface Props {
  userRole: UserRole;
}

const Home = ({ userRole }: Props) => (
  <div className="home">
    <div className="header">
      <Typography variant="h1">STAR TRACK</Typography>
    </div>
    <div className="menu">
      {pages
        .filter((page) => page.role === 'viewer'
            || userRole === page.role || userRole === 'admin')
        .map((page: LinkDisplayType) => (
          <div key={page.display} className="linkDisplay">
            <NavLink to={page.link}>
              {linkToIcon.find((link) => page.link === link.link)?.icon}
            </NavLink>
            <Typography variant="h6">{page.display}</Typography>
          </div>
        ))}
    </div>
  </div>
);

export default Home;
