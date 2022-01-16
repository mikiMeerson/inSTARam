import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import StarExpand from "./starExpand";
import { starType } from "../../../assets/star";

interface starProps {
  star: starType;
  setFeed: (star: starType) => void;
  removeStar: (star: starType) => void;
  changePriority: (star: starType, priority: number) => void;
  dragged: starType | undefined;
  setDragged: (star: starType | undefined) => void;
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

  const deleteStar = (star: starType) => {
    setOpenDesc(false);
    removeStar(star);
  };

  const handleDragOver = (e: any) => {
    e.currentTarget.style.borderTop = "2px solid blue";
  };

  const handleDrop = (e: any) => {
    e.currentTarget.style.borderTop = "none";
    if (dragged) {
      if (star.priority === 0) {
        // if moved inside the unprioritized table
        changePriority(dragged, 0);
      } else if (star.priority === 1) {
        // if moved to top of prioritized table
        changePriority(dragged, 1);
      } else {
        // if moved inside the prioritized table
        changePriority(dragged, star.priority - 1);
      }
    }
    setDragged(undefined);
  };

  return (
    <TableContainer component={Paper} className="starRow">
      <Table onClick={() => setOpenDesc(!openDesc)}>
        <TableRow
          draggable
          onDragStart={() => setDragged(star)}
          onDragOver={(e: any) => {
            e.preventDefault();
            e.currentTarget.style.borderTop = "2px solid blue";
          }}
          onDragLeave={(e: any) => e.currentTarget.style.borderTop = "none"}
          onDrop={handleDrop}
        >
          <TableCell align="center" width="50px">
            <div
              id="priority"
              style={{
                color:
                  star.severity === 1
                    ? "red"
                    : star.severity === 2
                    ? "orange"
                    : "green",
              }}
            >
              {star.priority > 0 ? star.priority : ""}
            </div>
          </TableCell>
          <TableCell width="105px">{star.name}</TableCell>
          <TableCell width="70px">{star.status}</TableCell>
          <TableCell width="70px">{star.assignee}</TableCell>
          <TableCell width="45px">{star.date}</TableCell>
          <TableCell width="60px">{star.version}</TableCell>
        </TableRow>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: "hidden" }}>
        <StarExpand star={star} setFeed={setFeed} removeStar={deleteStar} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
