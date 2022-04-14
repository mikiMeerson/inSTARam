import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IEvent, IStar } from '../../types/interfaces';

interface Props {
  star: IStar;
  event: IEvent | undefined;
}

const StarDescLine = ({ star, event }: Props) => (
  <Typography variant="caption" fontSize="13px" marginBottom="10px">
    הועלה על ידי
    {' '}
    <span style={{ color: 'crimson' }}>{star.publisher}</span>
    {event && (
      <>
        <span> מתוך </span>
        <Link to={`/events/${event._id}`} style={{ color: 'blue' }}>
          {event.name}
        </Link>
      </>
    )}
    {', '}
    איש קשר -
    {' '}
    <span style={{ color: 'crimson' }}>{star.publisher}</span>
  </Typography>
);

export default StarDescLine;
