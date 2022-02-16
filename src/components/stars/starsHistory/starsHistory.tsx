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
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
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
      {/* <TableRow>
        <TableCell sx={{ flexGrow: 1 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                פרטים נוספים
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>{desc}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
}

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof IStar;
  label: string;
}

const headCells: HeadCell[] = [
  {
    id: 'desc',
    label: '',
  },
  {
    id: 'name',
    label: 'שם הסטאר',
  },
  {
    id: 'assignee',
    label: 'אחראי',
  },
  {
    id: 'status',
    label: 'סטטוס',
  },
  {
    id: 'createdAt',
    label: 'זמן יצירה',
  },
  {
    id: 'event',
    label: 'אירוע',
  },
  {
    id: 'version',
    label: 'בלוק',
  },
];

interface EnhancedTableProps {
  order: Order;
  orderBy: any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof any
  ) => void;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    order,
    orderBy,
    onRequestSort } = props;
  const createSortHandler = function (property: keyof any) {
    return (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  };

  return (
    <TableHead>
      <TableRow sx={{ background: '#e8e8e8' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: any },
  b: { [key in Key]: any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface historyProps {
  updateStar: (starId: string, newStar: IStar) => void;
}

const StarsHistory = ({ updateStar }: historyProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [stars, setStars] = useState<IStar[]>([]);
  const [isEditor, setIsEditor] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof any>('name');

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

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof any,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stars.slice().sort(getComparator(order, orderBy))
              .map((row) => (
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
