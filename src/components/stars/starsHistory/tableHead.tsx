import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { StarKeyDisplayType } from '../../../types/configurations';
import { IStar } from '../../../types/interfaces';
import { OrderType } from '../../../types/string-types';

const headCells: StarKeyDisplayType[] = [
  {
    key: 'name',
    display: 'שם הסטאר',
  },
  {
    key: 'assignee',
    display: 'אחראי',
  },
  {
    key: 'status',
    display: 'סטטוס',
  },
  {
    key: 'createdAt',
    display: 'זמן יצירה',
  },
  {
    key: 'event',
    display: 'אירוע',
  },
  {
    key: 'block',
    display: 'בלוק',
  },
  {
    key: 'platform',
    display: 'פלטפורמה',
  },
];

interface Props {
  order: OrderType;
  orderBy: keyof IStar;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IStar
  ) => void;
}

const EnhancedTableHead = (props: Props) => {
  const {
    order,
    orderBy,
    onRequestSort } = props;
  const createSortHandler = (
    event: React.MouseEvent<unknown>,
    property: keyof IStar,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ background: 'whitesmoke' }}>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.key}
            align="center"
            sortDirection={orderBy === headCell.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.key}
              direction={orderBy === headCell.key ? order : 'asc'}
              onClick={(event) => createSortHandler(event, headCell.key)}
            >
              {headCell.display}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
