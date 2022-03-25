import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Star, Flight, Person } from '@mui/icons-material';
import '../components/home/home.css';
import { userRole } from '../types/string-types';
import { linkDisplayType, pages } from '../types/configurations';

const pageToIcon = [
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

interface HomeProps {
  userRole: userRole;
}

const Home = ({ userRole }: HomeProps) => (
  <div className="home">
    <div className="header">
      <Typography variant="h1">INSTARAM</Typography>
      <Typography variant="h6" color="white">
        המערכת שתעשה לכולנו סדר
      </Typography>
    </div>
    <div className="menu">
      {pages
        .filter((p) => p.role === 'viewer'
            || userRole === p.role || userRole === 'admin')
        .map((page: linkDisplayType, index) => (
          <div className="linkDisplay">
            <NavLink to={page.link} key={index}>
              {pageToIcon.find((p) => page.link === p.link)?.icon}
            </NavLink>
            <Typography variant="h6">{page.display}</Typography>
          </div>
        ))}
    </div>
  </div>
);

export default Home;
