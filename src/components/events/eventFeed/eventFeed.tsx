import { useState, useEffect } from 'react';
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
  UserRole,
  RAAM_STATIONS,
  BAZ_STATIONS,
  RAAM_COMPUTERS,
  BAZ_COMPUTERS,
} from '../../../types/string-types';

interface Props {
  userRole: UserRole;
  handleAlert: (isSuccess: boolean, content: string) => void;
}

const Event = ({ userRole, handleAlert }: Props) => {
  const [event, setEvent] = useState<IEvent>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async (): Promise<void> => {
      if (id) {
        const { status, data } = await getEventById(id);
        if (status !== StatusCodes.OK) {
          throw new Error('Error! Event not found');
        }
        setEvent(data.event);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

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

  const setAttr = (attr: keyof IEvent, value: IEvent[keyof IEvent]) => {
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
          {... { userRole, event, isEdit, setIsEdit, handleUpdateEvent }}
        />
        <EventDetails
          {... { event, setAttr }}
          disabled={!isEdit}
          isValue
        />
        <EventVersions
          {... { event, setAttr }}
          isEditable={isEdit}
          stations={event.platform === 'רעם'
            ? RAAM_STATIONS
            : BAZ_STATIONS}
          computers={event.platform === 'רעם'
            ? RAAM_COMPUTERS
            : BAZ_COMPUTERS}
        />
        <EventLists
          {... { event, setAttr, handleAlert }}
          editable={isEdit}
        />
      </div>
    </>
  );
};

export default Event;
