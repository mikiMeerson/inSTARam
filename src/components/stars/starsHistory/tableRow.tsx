import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import {
  TableRow,
  TableCell,
  Button,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { IStar } from '../../../types/interfaces';
import { UserRole } from '../../../types/string-types';
import DialogAlert from '../../general/dialogAlert';
import { getEventById } from '../../../services/event-service';

interface rowType {
    row: IStar;
    updateStar: (starId: string, newStar: IStar) => void;
  userRole: UserRole;
}

const Row = ({ row, updateStar, userRole }: rowType) => {
  const [isReopenAlert, setIsReopenAlert] = useState<boolean>(false);
  const [eventName, setEventName] = useState<string>('ללא אירוע');
  const [isOpen, setIsOpen] = useState(false);
  const {
    name,
    severity,
    event,
    createdAt,
    assignee,
    status,
    block,
    platform,
    desc,
  } = row;

  useEffect(() => {
    const fetchEvent = async () => {
      if (row.event) {
        const { status, data } = await getEventById(row.event);
        if (status === StatusCodes.OK && data.event) {
          setEventName(data.event.name);
        }
      }
    };
    fetchEvent();
  }, [row]);

  const getDisplayDate = (time: Date) => {
    const displayDate = `${time.getFullYear()} 
            ${time.getDate()} 
            ${time.toLocaleString('default', { month: 'long' })}`;
    return displayDate || '';
  };

  const handleReopen = (starToReopen: IStar) => {
    const newStar = JSON.parse(JSON.stringify(starToReopen));
    newStar.status = 'פתוח';
    updateStar(starToReopen._id, newStar);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">{name}</TableCell>
        <TableCell align="center" component="th" scope="row">
          {severity}
        </TableCell>
        <TableCell align="center">{assignee}</TableCell>
        <TableCell align="center">
          {status === 'סגור' && userRole !== 'viewer'
            ? (
              <Button
                variant="contained"
                color="info"
                onClick={() => setIsReopenAlert(true)}
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
                <span style={{ color: 'blue' }}>{eventName}</span>
              </NavLink>
            )
            : 'ללא אירוע'}
        </TableCell>
        <TableCell align="center">{block}</TableCell>
        <TableCell align="center">{platform}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, textAlign: 'right' }} colSpan={6}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: '20px 150px 20px 20px' }}>
              <Typography variant="body1">
                {desc}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DialogAlert
        header="לפתוח מחדש את הסטאר?"
        content="הסטאר יופיע בעמוד ניהול הסטארים"
        isOpen={isReopenAlert}
        setIsOpen={setIsReopenAlert}
        activateResponse={handleReopen}
        param={row}
      />
    </>
  );
};

export default Row;
