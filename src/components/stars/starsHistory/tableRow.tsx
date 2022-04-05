import { TableRow, TableCell, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';

interface rowType {
    row: IStar;
    updateStar: (starId: string, newStar: IStar) => void;
  userRole: UserRole;
}

const Row = ({ row, updateStar, userRole }: rowType) => {
  const { name, event, createdAt, assignee, status, block, platform } = row;

  const getDisplayDate = (time: Date) => {
    const displayDate = `${time.getFullYear()} 
            ${time.getDate()} 
            ${time.toLocaleString('default', { month: 'long' })}`;
    return displayDate || '';
  };

  const handleReopen = () => {
    const newStar = JSON.parse(JSON.stringify(row));
    newStar.status = 'פתוח';
    updateStar(row._id, newStar);
  };

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">{name}</TableCell>
      <TableCell align="center">{assignee}</TableCell>
      <TableCell align="center">
        {status === 'סגור' && userRole !== 'viewer'
          ? (
            <Button
              variant="contained"
              color="info"
              onClick={(handleReopen)}
            >
              פתח מחדש
            </Button>
          )
          : status}
      </TableCell>
      <TableCell align="center">
        {createdAt && getDisplayDate(new Date(createdAt))}
      </TableCell>
      <TableCell align="center">
        {event
          ? (
            <NavLink to={`/events/${event}`}>
              <span style={{ color: 'blue' }}>{event}</span>
            </NavLink>
          )
          : 'ללא אירוע'}
      </TableCell>
      <TableCell align="center">{block}</TableCell>
      <TableCell align="center">{platform}</TableCell>
    </TableRow>
  );
};

export default Row;
