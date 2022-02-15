import { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Collapse,
  Typography,
  Button,
} from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { getStars } from '../../../services/star-service';
import { authorizeUser } from '../../../services/user-service';

// todo: 1. make desc section better
//       3. filtering
//       4. sorting

interface rowType {
  row: IStar;
  updateStar: (starId: string, newStar: IStar) => void;
  isEditor: boolean;
}

function Row({ row, updateStar, isEditor }: rowType) {
  const { name, event, createdAt, assignee, status, version, desc } = row;
  const [open, setOpen] = useState(false);

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
    <>
      <TableRow sx={{ '& > *': { border: 'none' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">{name}</TableCell>
        <TableCell align="center">{assignee}</TableCell>
        <TableCell align="center">
          {status === 'סגור' && isEditor
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
      <TableRow>
        <TableCell
          align="right"
          colSpan={12}
          sx={{
            display: open ? '' : 'none',
            background: open ? 'whitesmoke' : '',
            border: open ? '1px solid silver' : '',
          }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                פרטים נוספים
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>{desc}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

interface historyProps {
  updateStar: (starId: string, newStar: IStar) => void;
}

const StarsHistory = ({ updateStar }: historyProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stars, setStars] = useState<IStar[]>([]);
  const [isEditor, setIsEditor] = useState<boolean>(false);

  const fetchStars = (): void => {
    getStars()
      .then((res) => {
        setStars(res.data.stars);
      })
      .catch((err: Error) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetchStars();
    authorizeUser('editor').then((res: boolean) => setIsEditor(res));
    setLoading(false);
    return () => ac.abort();
  }, []);
  return (
    <div style={{ height: '95%' }}>
      {loading && (
        <Box sx={{
          position: 'absolute', top: '50%', right: '50%', zIndex: 1,
        }}
        >
          <CircularProgress size="100px" />
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">שם הסטאר</TableCell>
              <TableCell align="center">אחראי</TableCell>
              <TableCell align="center">סטטוס</TableCell>
              <TableCell align="center">זמן יצירה</TableCell>
              <TableCell align="center">אירוע</TableCell>
              <TableCell align="center">בלוק</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stars.map((row) => (
              <Row
                key={row.name}
                row={row}
                updateStar={updateStar}
                isEditor={isEditor}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StarsHistory;
