import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import { Box, CircularProgress } from '@mui/material';
import { getEventById, updateEvent } from '../../../services/event-service';
import EventVersions from '../commonEventFields/eventVersions';
import EventDetails from '../commonEventFields/eventDetails';
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
    userRole: userRole;
    handleAlert: (isSuccess: boolean, content: string) => void;
}

const Event = ({ userRole, handleAlert }: eventProps) => {
  const [event, setEvent] = useState<IEvent>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams();

  const fetchEvent = useCallback(async (): Promise<void> => {
    if (id) {
      const { status, data } = await getEventById(id);
      if (status !== StatusCodes.OK) {
        throw new Error('Error! Event not found');
      }
      setEvent(data.event);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvent();
  }, []);

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

  const setAttr = (attr: keyof IEvent, value: any) => {
    setEvent(Object.assign(event, { [attr]: value }));
  };

  const handleUpdateEvent = async (): Promise<void> => {
    const { status } = await updateEvent(event._id, event);
    if (status !== StatusCodes.OK) {
      handleAlert(false, 'לא הצלחנו לעדכן את האירוע');
    } else {
      handleAlert(true, 'האירוע עודכן בהצלחה');
    }
  };

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
          handleUpdateEvent={handleUpdateEvent}
        />
        <EventDetails
          event={event}
          setAttr={setAttr}
          disabled={!isEdit}
          isValue
        />
        <EventVersions
          isEditable={isEdit}
          event={event}
          stations={event.platform === PLATFORMS.RAAM
            ? Object.values(RAAM_STATIONS)
            : Object.values(BAZ_STATIONS)}
          computers={event.platform === PLATFORMS.RAAM
            ? Object.values(RAAM_COMPUTERS)
            : Object.values(BAZ_COMPUTERS)}
          setAttr={setAttr}
        />
        <EventLists event={event} editable={isEdit} setAttr={setAttr} />
      </div>
    </>
  );
};

export default Event;
