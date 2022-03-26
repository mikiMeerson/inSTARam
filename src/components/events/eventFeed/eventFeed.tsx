import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import {
  Box,
  CircularProgress,
} from '@mui/material';
import { getEventById } from '../../../services/event-service';
import EventVersions from './eventVersions';
import EventDetails from './eventDetails';
import EventHeader from './eventHeader';
import EventLists from './eventLists';
import { IEvent } from '../../../types/interfaces';
import {
  BAZ_COMPUTERS,
  BAZ_STATIONS,
  PLATFORMS,
  RAAM_COMPUTERS,
  RAAM_STATIONS,
} from '../../../types/enums';

interface eventProps {
    eventId: string | undefined;
}

const Event = ({ eventId }: eventProps) => {
  const [event, setEvent] = useState<IEvent>();
  const [loading, setLoading] = useState<boolean>(false);

  if (!eventId) {
    const navigate = useNavigate();
    navigate('/events');
    return null;
  }

  const fetchEvent = useCallback(async (): Promise<void> => {
    const { status, data } = await getEventById(eventId);
    if (status !== StatusCodes.OK) {
      throw new Error('Error! Event not found');
    }
    setEvent(data.event);
  }, [eventId]);

  useEffect(() => {
    setLoading(true);
    fetchEvent();
    setLoading(false);
  }, [fetchEvent, event]);

  if (!event) {
    return (
      <Box sx={{
        position: 'absolute', top: '50%', right: '50%', zIndex: 1,
      }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress />
        </Box>
      )}
      <div className="eventFeed">
        <EventHeader event={event} />
        <EventDetails event={event} />
        <EventVersions
          event={event}
          stations={event.platform === PLATFORMS.RAAM
            ? Object.values(RAAM_STATIONS)
            : Object.values(BAZ_STATIONS)}
          computers={event.platform === PLATFORMS.RAAM
            ? Object.values(RAAM_COMPUTERS)
            : Object.values(BAZ_COMPUTERS)}
        />
        <EventLists event={event} />
      </div>
    </>
  );
};

export default Event;
