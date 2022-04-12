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
  KeyboardDoubleArrowDown,
} from '@mui/icons-material';
import StarExpand from './starExpand';
import { UserRole } from '../../../types/string-types';
import { IEvent, IStar } from '../../../types/interfaces';

interface Props {
  userRole: UserRole;
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
}: Props) => {
  const [openDesc, setOpenDesc] = useState(false);

  const severityIcons = [
    {
      severity: 'חמור מאוד (1)',
      icon: <PriorityHigh fontSize="large" color="error" />,
    },
    {
      severity: 'חמור (2)',
      icon: <ErrorOutline fontSize="large" color="warning" />,
    },
    {
      severity: 'בינוני (3)',
      icon: <WarningAmber fontSize="large" htmlColor="yellow" />,
    },
    {
      severity: 'קל (4)',
      icon: <KeyboardDoubleArrowDown fontSize="large" color="info" />,
    },
    {
      severity: 'במעקב (99)',
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
      changePriority(dragged, star.priority);
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
                {severityIcons
                  .find(
                    (severity) => severity.severity === star.severity,
                  )?.icon}
              </span>
            </TableCell>
            <TableCell width="105px" align="center">{star.name}</TableCell>
            <TableCell width="70px" align="center">{star.status}</TableCell>
            <TableCell width="70px" align="center">{star.assignee}</TableCell>
            <TableCell width="45px" align="center">
              {getCreationTime()}
            </TableCell>
            <TableCell width="60px" align="center">
              {`${star.platform} ${star.block}`}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: 'hidden' }}>
        <StarExpand {... { userRole, star, event, deleteStar }} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
