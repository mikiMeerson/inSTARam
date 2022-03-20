import { Typography } from '@mui/material';

interface EventProps {
    event: IEvent;
}

const EventHeader = ({ event }: EventProps) => {
  const getDisplayDate = (date: Date) => {
    date = new Date(date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="eventsHeader">
      <Typography variant="h2">
        {event.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: '150%' }}>
        {event.platform}
        {' '}
        בלוק
        {' '}
        {event.block}
        {' - '}
        {event.type}
        {event.reason && (
          <span>
            {', '}
            {event.dates[1] === event.dates[0]
              ? getDisplayDate(event.dates[1])
              : `${getDisplayDate(event.dates[1])} - ${getDisplayDate(event.dates[0])}`}
          </span>
        )}
      </Typography>
    </div>
  );
};

export default EventHeader;
