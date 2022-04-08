import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import {
  TableContainer,
  Table,
  TableBody,
  Paper,
} from '@mui/material';
import EnhancedTableHead from './tableHead';
import Row from './tableRow';
import { OrderType, UserRole } from '../../../types/string-types';
import { IStar } from '../../../types/interfaces';
import { getStars } from '../../../services/star-service';

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
  order: OrderType,
  orderBy: keyof IStar,
): (
    a: IStar,
    b: IStar,
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface Props {
  userRole: UserRole;
  updateStar: (starId: string, newStar: IStar) => void;
}

const StarsHistory = ({ userRole, updateStar }: Props) => {
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState<keyof IStar>('name');
  const [stars, setStars] = useState<IStar[]>([]);

  useEffect(() => {
    const fetchStars = async () => {
      const { status, data } = await getStars(); //! pagination
      if (status !== StatusCodes.OK) console.log('Could not fetch stars');
      else setStars(data.stars);
    };
    fetchStars();
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
                  userRole={userRole}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StarsHistory;
