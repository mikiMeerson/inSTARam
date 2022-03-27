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
import EventLists from '../commonEventFields/eventLists';
import { IEvent } from '../../../types/interfaces';
import {
  BAZ_COMPUTERS,
  BAZ_STATIONS,
  PLATFORMS,
  RAAM_COMPUTERS,
  RAAM_STATIONS,
} from '../../../types/enums';
import { userRole } from '../../../types/string-types';

interface eventProps {
    eventId: string | undefined;
    userRole: userRole;
}

const Event = ({ eventId, userRole }: eventProps) => {
  const [event, setEvent] = useState<IEvent>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

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
        <EventHeader
          userRole={userRole}
          event={event}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
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
        <EventLists event={event} editable={false} />
      </div>
    </>
  );
};

export default Event;
