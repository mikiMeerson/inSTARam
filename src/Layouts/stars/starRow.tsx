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
import { starType } from "../../assets/star";

interface starProps {
  star: starType;
}
const StarRow = ({ star }: starProps) => {
  const [openDesc, setOpenDesc] = useState(false);

  return (
    <TableContainer component={Paper} className="starRow">
      <Table onClick={() => setOpenDesc(!openDesc)}>
        <TableRow
          draggable
          onDragOver={(e: any) => {
            e.preventDefault();
          }}
          onDrop={(e: any) => {
            console.log("dropped");
          }}
        >
          <TableCell align="right">
            <div id="priority">{star.priority}</div>
          </TableCell>
          <TableCell align="right">{star.starNumber}</TableCell>
          <TableCell align="right">{star.name}</TableCell>
          <TableCell align="right">{star.status}</TableCell>
          <TableCell align="right">{star.assignee}</TableCell>
          <TableCell align="right">{star.date}</TableCell>
          <TableCell align="right">{star.version}</TableCell>
        </TableRow>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: "hidden" }}>
        <StarExpand star={star} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
