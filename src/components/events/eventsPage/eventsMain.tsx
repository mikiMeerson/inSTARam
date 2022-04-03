import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  SpeedDial,
  Typography,
  SpeedDialIcon,
} from '@mui/material';
import { FlightTakeoffOutlined } from '@mui/icons-material';
import { getEvents } from '../../../services/event-service';
import '../styles/event.css';
import { IEvent } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import EventsList from './eventsList';

interface Props {
  userRole: UserRole;
  handleAlert: (isSuccess: boolean, content: string) => void;
}

const EventsMain = ({ userRole, handleAlert }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      setLoading(true);
      const { data } = await getEvents();
      setEvents(data.events);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <div className="events">
      {loading && (
      <Box sx={{
        position: 'absolute', top: '50%', right: '50%', zIndex: 1,
      }}
      >
        <CircularProgress size="100px" />
      </Box>
      )}
      <div className="eventsHeader">
        <Typography variant="h1">
          אירועים
        </Typography>
        { userRole !== 'viewer' && (
        <Link to="create">
          <SpeedDial
            ariaLabel="SpeedDial controlled open example"
            icon={<SpeedDialIcon openIcon={<FlightTakeoffOutlined />} />}
          />
        </Link>
        )}
      </div>
      <EventsList
        events={events}
        setEvents={setEvents}
        userRole={userRole}
        handleAlert={handleAlert}
      />
    </div>
  );
};

export default EventsMain;
