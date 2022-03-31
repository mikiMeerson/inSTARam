import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Computer, DeleteOutlined, FlightTakeoff } from '@mui/icons-material';
import DialogAlert from '../general/dialogAlert';
import { IEvent } from '../../types/interfaces';
import { userRole } from '../../types/string-types';
import { EVENT_TYPES } from '../../types/enums';

interface Props {
    event: IEvent;
    handleDeleteEvent: (event: IEvent) => void;
    userRole: userRole;
}

const EventCard = ({
  event,
  handleDeleteEvent,
  userRole,
}: Props) => {
  const [isEventDelete, setIsEventDelete] = useState<boolean>(false);

  const getDisplayDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const typeToIcon = [
    {
      type: EVENT_TYPES.REG_FLIGHT,
      icon: <FlightTakeoff htmlColor="black" fontSize="large" />,
    },
    {
      type: EVENT_TYPES.MANAT_FLIGHT,
      icon: <FlightTakeoff htmlColor="black" fontSize="large" />,
    },
    {
      type: EVENT_TYPES.DEV_TEST,
      icon: <Computer htmlColor="black" fontSize="large" />,
    },
    {
      type: EVENT_TYPES.INT_TEST,
      icon: <Computer htmlColor="black" fontSize="large" />,
    },
  ];

  return (
    <Card className="eventCard">
      <CardActionArea>
        <NavLink to={`/events/${event._id}`}>
          <div className="cardHeader">
            <IconButton disabled>
              {typeToIcon.find((element) => element.type === event.type)?.icon}
            </IconButton>
            <Typography gutterBottom variant="h5" component="div">
              {event.name}
            </Typography>
          </div>
          <hr />
          <CardContent>
            <Typography color="text.secondary">
              {event.type}
              {' '}
              {
              event.dates[1] === event.dates[0]
                ? getDisplayDate(event.dates[1])
                : `${getDisplayDate(
                  event.dates[1],
                )} - ${getDisplayDate(
                  event.dates[0],
                )}`
              }
            </Typography>
            <Typography color="text.secondary">
              {event.platform}
              {' '}
              בלוק
              {' '}
              {event.block}
            </Typography>
          </CardContent>
        </NavLink>
        {(userRole !== 'viewer') && (
        <IconButton
          id="moreButton"
          color="primary"
          onClick={() => setIsEventDelete(!isEventDelete)}
        >
          <DeleteOutlined color="error" />
        </IconButton>
        )}
        <DialogAlert
          header="למחוק את האירוע?"
          content="כל פרטי האירוע יימחקו לצמיתות"
          isOpen={isEventDelete}
          setIsOpen={setIsEventDelete}
          activateResponse={handleDeleteEvent}
          param={event}
        />
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
