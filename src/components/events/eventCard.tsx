import { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { Computer, FlightTakeoff, MoreVert } from '@mui/icons-material';
import { EVENT_TYPES } from '../../assets';

interface CardProps {
    event: IEvent;
}

const EventCard = ({ event }: CardProps) => {
  const [displayActions, setDisplayActions] = useState<boolean>(false);

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
            {getDisplayDate(event.dates[1])}
            {' - '}
            {getDisplayDate(event.dates[0])}
          </Typography>
          <Typography color="text.secondary">
            {event.platform}
            {' '}
            בלוק
            {' '}
            {event.block}
          </Typography>
          <IconButton
            id="moreButton"
            color="primary"
            onClick={() => setDisplayActions(!displayActions)}
          >
            <MoreVert />
          </IconButton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
