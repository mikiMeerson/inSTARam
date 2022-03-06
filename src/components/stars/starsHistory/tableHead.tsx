import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { starKeyDisplayType } from '../../../assets';

const headCells: starKeyDisplayType[] = [
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
];

interface EnhancedTableProps {
  order: orderType;
  orderBy: keyof IStar;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IStar
  ) => void;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
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
