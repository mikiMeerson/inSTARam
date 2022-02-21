import { TableRow, TableCell, Button } from '@mui/material';
import { STATUSES } from '../../../assets/utils';

interface rowType {
    row: IStar;
    updateStar: (starId: string, newStar: IStar) => void;
    userRole: userRole;
}

const Row = ({ row, updateStar, userRole }: rowType) => {
  const { name, event, createdAt, assignee, status, version } = row;

  const getDisplayDate = (time: Date) => {
    const displayDate = `${time.getFullYear()} 
            ${time.getDate()} 
            ${time.toLocaleString('default', { month: 'long' })}`;
    return displayDate || '';
  };

  const handleReopen = () => {
    const newStar = JSON.parse(JSON.stringify(row));
    newStar.status = STATUSES.OPEN;
    updateStar(row._id, newStar);
  };

  return (
    <TableRow>
      <TableCell align="center" component="th" scope="row">{name}</TableCell>
      <TableCell align="center">{assignee}</TableCell>
      <TableCell align="center">
        {status === STATUSES.CLOSED && userRole !== 'viewer'
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
      <TableCell align="center">{event}</TableCell>
      <TableCell align="center">{version}</TableCell>
    </TableRow>
  );
};

export default Row;
