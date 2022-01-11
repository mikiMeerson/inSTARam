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

const StarRow = () => {
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
          <TableCell align="right"><div id="priority">1</div></TableCell>
          <TableCell align="right">33</TableCell>
          <TableCell align="right">הצמדת יעף לא עובדת</TableCell>
          <TableCell align="right">פתוח</TableCell>
          <TableCell align="right">מא"ב</TableCell>
          <TableCell align="right">10/11/2021</TableCell>
          <TableCell align="right">F</TableCell>
        </TableRow>
      </Table>
      <Collapse in={openDesc} sx={{ overflow: "hidden" }}>
        <StarExpand />
      </Collapse>
    </TableContainer>
  );
};

export default StarRow;
