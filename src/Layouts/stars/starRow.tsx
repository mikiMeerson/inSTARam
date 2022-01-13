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
          <TableCell align="center" width='40px'>
            <div id="priority">{star.priority}</div>
          </TableCell>
          <TableCell width='140px'>{star.name}</TableCell>
          <TableCell width='50px'>{star.status}</TableCell>
          <TableCell width='50px'>{star.assignee}</TableCell>
          <TableCell width='60px'>{star.date}</TableCell>
          <TableCell width='60px'>{star.version}</TableCell>
        </TableRow>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: "hidden" }}>
        <StarExpand star={star} />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
