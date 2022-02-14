import { useState, useEffect, BaseSyntheticEvent } from 'react';
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  TableBody,
} from '@mui/material';
import StarExpand from './starExpand';
import { severityColors } from '../../../assets/star';
import { authorizeUser } from '../../../services/user-service';

interface starProps {
  star: IStar;
  setFeed: (id: string) => void;
  removeStar: (starId: string) => void;
  changePriority: (star: IStar, priority: number) => void;
  dragged: IStar | undefined;
  setDragged: (star: IStar | undefined) => void;
}
const StarRow = ({
  star,
  setFeed,
  removeStar,
  changePriority,
  dragged,
  setDragged,
}: starProps) => {
  const [openDesc, setOpenDesc] = useState(false);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  useEffect(() => {
    const ac = new AbortController();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    return () => ac.abort();
  }, []);

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
    e.preventDefault();
    e.currentTarget.style.borderTop = '2px solid blue';
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
            draggable={isEditor}
            onDragStart={handleStartDrag}
            onDragOver={handleDragOver}
            onDragLeave={
              (e: BaseSyntheticEvent) => e.currentTarget
                .style.borderTop = 'none'
            }
            onDrop={handleDrop}
          >
            <TableCell align="center" width="40px">
              <div
                id="priority"
                style={{
                  color: severityColors[star.severity - 1],
                }}
              >
                {star.priority > 0 ? star.priority : '?'}
              </div>
            </TableCell>
            <TableCell width="105px" align="center">{star.name}</TableCell>
            <TableCell width="70px" align="center">{star.status}</TableCell>
            <TableCell width="70px" align="center">{star.assignee}</TableCell>
            <TableCell width="45px" align="center">
              {getCreationTime()}
            </TableCell>
            <TableCell width="60px" align="center">{star.version}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: 'hidden' }}>
        <StarExpand star={star} setFeed={setFeed} removeStar={deleteStar} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
