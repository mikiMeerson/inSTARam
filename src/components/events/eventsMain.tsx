import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  Typography,
} from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { deleteEvent, getEvents } from '../../services/event-service';
import EventCard from './eventCard';
import './styles/event.css';

interface eventProps {
  userRole: userRole;
  setEventToDisplay: (param: string) => void;
}

const EventsMain = ({ userRole, setEventToDisplay }: eventProps) => {
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
    if (status !== StatusCodes.OK) console.log('could not delete event');
    else fetchEvents();
  };

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
      </div>
      <div className="eventsCotainer">
        <Grid container className="eventsList">
          <Grid className="cardContainer" item xs={3}>
            <Link to="create">
              <Card className="eventCard" id="addEvent">
                <CardActionArea>
                  <AddCircleOutline sx={{ fontSize: '40px' }} />
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
          {
          events.map((e) => (
            <Grid className="cardContainer" item xs={3}>
              <EventCard
                key={e._id}
                event={e}
                handleDeleteEvent={handleDeleteEvent}
                setEventToDisplay={setEventToDisplay}
                userRole={userRole}
              />
            </Grid>
          ))
        }
        </Grid>
      </div>
    </div>
  );
};

export default EventsMain;
