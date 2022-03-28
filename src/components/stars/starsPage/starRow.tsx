import { useState, BaseSyntheticEvent } from 'react';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  TableBody,
} from '@mui/material';
import {
  ArrowDownward,
  ErrorOutline,
  PriorityHigh,
  WarningAmber,
} from '@mui/icons-material';
import StarExpand from './starExpand';
import { userRole } from '../../../types/string-types';
import { IEvent, IStar } from '../../../types/interfaces';
import { SEVERITIES } from '../../../types/enums';

interface starProps {
  userRole: userRole;
  star: IStar;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
  event: IEvent | undefined;
}
const StarRow = ({
  userRole,
  star,
  removeStar,
  changePriority,
  dragged,
  setDragged,
  event,
}: starProps) => {
  const [openDesc, setOpenDesc] = useState(false);

  const severityIcons = [
    {
      severity: SEVERITIES.VERY_SERIOUS,
      icon: <PriorityHigh fontSize="large" color="error" />,
    },
    {
      severity: SEVERITIES.SERIOUS,
      icon: <ErrorOutline fontSize="large" color="warning" />,
    },
    {
      severity: SEVERITIES.MEDIUM,
      icon: <WarningAmber fontSize="large" htmlColor="yellow" />,
    },
    {
      severity: SEVERITIES.SLIGHT,
      icon: <ArrowDownward fontSize="large" color="disabled" />,
    },
  ];

  const getCreationTime = () => {
    const date = star.createdAt ? new Date(star.createdAt) : undefined;
    const displayDate = date
      && `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return displayDate;
  };
  const deleteStar = () => {
    setOpenDesc(false);
    removeStar(star._id);
  };

  const handleStartDrag = () => {
    setDragged(star);
  };

  const handleDragOver = (e: BaseSyntheticEvent) => {
    if (!(star.priority === 0 && dragged?.priority === 0)) {
      e.preventDefault();
      e.currentTarget.style.borderTop = '2px solid blue';
    }
  };

  const handleDrop = (e: BaseSyntheticEvent) => {
    e.currentTarget.style.borderTop = 'none';
    if (dragged) {
      if (star.priority === 0) {
        // if moved into the unprioritized table
        changePriority(dragged, 0);
      } else if (star.priority === 1) {
        // if moved to top of prioritized table
        changePriority(dragged, 1);
      } else {
        // if moved inside the prioritized table
        changePriority(dragged, star.priority);
      }
    }
    setDragged(undefined);
  };

  return (
    <TableContainer component={Paper} className="starRow">
      <Table onClick={() => setOpenDesc(!openDesc)}>
        <TableBody>
          <TableRow
            draggable={userRole !== 'viewer'}
            onDragStart={handleStartDrag}
            onDragOver={handleDragOver}
            onDragLeave={
              (e: BaseSyntheticEvent) => e.currentTarget
                .style.borderTop = 'none'
            }
            onDrop={handleDrop}
          >
            <TableCell align="center" width="40px">
              <span className="severityIcon">
                {severityIcons.find((i) => i.severity === star.severity)?.icon}
              </span>
            </TableCell>
            <TableCell width="105px" align="center">{star.name}</TableCell>
            <TableCell width="70px" align="center">{star.status}</TableCell>
            <TableCell width="70px" align="center">{star.assignee}</TableCell>
            <TableCell width="45px" align="center">
              {getCreationTime()}
            </TableCell>
            <TableCell width="60px" align="center">
              {star.platform}
              {' '}
              {star.block}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: 'hidden' }}>
        <StarExpand
          userRole={userRole}
          star={star}
          removeStar={deleteStar}
          event={event}
        />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
