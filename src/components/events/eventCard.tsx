import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { FlightTakeoff } from '@mui/icons-material';

interface CardProps {
    event: IEvent;
}

const EventCard = ({ event }: CardProps) => {
  const getDisplayDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Card className="eventCard">
      <CardActionArea>
        <div className="cardHeader">
          <IconButton disabled>
            <FlightTakeoff htmlColor="black" fontSize="large" />
          </IconButton>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
        </div>
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
