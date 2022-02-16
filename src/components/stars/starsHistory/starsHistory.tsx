import { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  TableContainer,
  Table,
  TableBody,
  Paper,
} from '@mui/material';
import { getStars } from '../../../services/star-service';
import { authorizeUser } from '../../../services/user-service';
import EnhancedTableHead from './tableHead';
import Row from './tableRow';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(
  order: orderType,
  orderBy: keyof IStar,
): (
    a: IStar,
    b: IStar,
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
  const [order, setOrder] = useState<orderType>('asc');
  const [orderBy, setOrderBy] = useState<keyof IStar>('name');

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
    property: keyof IStar,
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
