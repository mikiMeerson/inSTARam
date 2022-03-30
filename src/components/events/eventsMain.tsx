import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Grid,
  SpeedDial,
  Typography,
  SpeedDialIcon,
} from '@mui/material';
import { FlightTakeoffOutlined } from '@mui/icons-material';
import { deleteEvent, getEvents } from '../../services/event-service';
import EventCard from './eventCard';
import './styles/event.css';
import { IEvent } from '../../types/interfaces';
import { userRole } from '../../types/string-types';

interface eventProps {
  userRole: userRole;
  handleAlert: (isSuccess: boolean, content: string) => void;
}

const EventsMain = ({ userRole, handleAlert }: eventProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[]>([]);

  const fetchEvents = async (): Promise<void> => {
    setLoading(true);
    const { data } = await getEvents();
    setEvents(data.events);
    setLoading(false);
  };

  const handleDeleteEvent = async (event: IEvent) => {
    const { status } = await deleteEvent(event._id);
    if (status !== StatusCodes.OK) {
      handleAlert(false, 'לא הצלחנו למחוק את האירוע');
    } else {
      handleAlert(true, 'האירוע נמחק בהצלחה');
      fetchEvents();
    }
  };

  const sortByDate = (events: IEvent[]) => events
    .sort((a: IEvent, b: IEvent) => {
      if (a.dates[0] < b.dates[0]) return 1;
      if (a.dates[0] > b.dates[0]) return -1;
      if (a.dates[1] < b.dates[1]) return 1;
      if (a.dates[1] > b.dates[1]) return -1;
      return 0;
    });

  useEffect(() => {
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
        <Typography variant="h2">
          אירועים
        </Typography>
        { userRole !== 'viewer' && (
        <Link to="create">
          <SpeedDial
            sx={{
              position: 'absolute',
              left: '75px',
              top: '105px',
            }}
            ariaLabel="SpeedDial controlled open example"
            icon={<SpeedDialIcon openIcon={<FlightTakeoffOutlined />} />}
          />
        </Link>
        )}
      </div>
      <div className="eventsContainer">
        <Grid container className="eventsList">
          {sortByDate(events).map((e) => (
            <Grid key={e._id} className="cardContainer" item xs={3}>
              <EventCard
                event={e}
                handleDeleteEvent={handleDeleteEvent}
                userRole={userRole}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default EventsMain;
