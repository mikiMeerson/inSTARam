import { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import {
  TableContainer,
  Table,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import { ExpandMore, ChevronLeft } from '@mui/icons-material';
import EnhancedTableHead from './tableHead';
import Row from './tableRow';
import { OrderType, PlatformType, UserRole } from '../../../types/string-types';
import { IStar } from '../../../types/interfaces';
import FilterHeaders from './filterHeaders';
import { FilterDataType } from '../../../types/configurations';
import SearchBar from '../../events/filters/searchBar';
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
  platformToShow: PlatformType;
}

const StarsHistory = ({ userRole, updateStar, platformToShow }: Props) => {
  const [order, setOrder] = useState<OrderType>('asc');
  const [orderBy, setOrderBy] = useState<keyof IStar>('name');
  const [stars, setStars] = useState<IStar[]>([]);
  const [filteredStars, setFilteredStars] = useState<IStar[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [assigneeFilter, setAssigneeFilter] = useState<string[]>([]);
  const [platformFilter, setPlatformFilter] = useState<string[]>(
    [platformToShow],
  );
  const [blockFilter, setBlockFilter] = useState<string[]>([]);
  const [computerFilter, setComputerFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string[]>([]);
  const [phaseFilter, setPhaseFilter] = useState<string[]>([]);
  const [freeTextFilter, setFreeTextFilter] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<boolean>(true);

  useEffect(() => {
    const fetchStars = async () => {
      const { status, data } = await getStars();
      if (status !== StatusCodes.OK) console.log('Could not fetch stars');
      else setStars(data.stars);
    };

    if (stars.length === 0) fetchStars();
    const tempFilteredStars: IStar[] = [];
    stars.forEach((star) => {
      if ((freeTextFilter === ''
        || star.name.includes(freeTextFilter)
        || star.desc.includes(freeTextFilter))
        && (statusFilter.length === 0 || statusFilter.includes(star.status))
        && (platformFilter.length === 0
          || platformFilter.includes(star.platform))
        && (blockFilter.length === 0 || blockFilter.includes(star.block))
        && (assigneeFilter.length === 0
          || assigneeFilter.includes(star.assignee))
        && (computerFilter.length === 0
          || computerFilter.includes(star.computer))
        && (phaseFilter.length === 0 || phaseFilter.includes(star.phase))
        && (dateFilter.length === 0 || (star.createdAt
          && new Date(star.createdAt) >= new Date(dateFilter[0])
          && new Date(star.createdAt) <= new Date(
            new Date(dateFilter[1]).getFullYear(),
            new Date(dateFilter[1]).getMonth(),
            new Date(dateFilter[1]).getDate() + 1,
          )))) {
        tempFilteredStars.push(star);
      }
    });
    setFilteredStars(tempFilteredStars);
  }, [
    stars,
    assigneeFilter,
    platformFilter,
    blockFilter,
    computerFilter,
    dateFilter,
    freeTextFilter,
    phaseFilter,
    statusFilter,
  ]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IStar,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filtersData: FilterDataType[] = [
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
      chipColor: 'primary',
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
      chipColor: 'secondary',
    },
    {
      tabName: 'platform',
      filter: platformFilter,
      func: setPlatformFilter,
      chipColor: 'error',
    },
    {
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      chipColor: 'warning',
    },
    {
      tabName: 'phase',
      filter: phaseFilter,
      func: setPhaseFilter,
      chipColor: 'default',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      chipColor: 'info',
    },
    {
      tabName: 'date',
      filter: dateFilter,
      func: setDateFilter,
      chipColor: 'error',
    },
  ];

  return (
    <div className="starsHistory">
      <Button
        color="info"
        sx={{
          position: 'absolute',
          top: '100px',
          right: '10px',
        }}
        onClick={() => setOpenFilter(!openFilter)}
      >
        {openFilter ? <ExpandMore /> : (
          <>
            <ChevronLeft />
            <span>הצג אפשרויות סינון וחיפוש</span>
          </>
        )}
      </Button>
      {openFilter && (
        <div className="historyFilterContainer">
          <SearchBar
            list={stars}
            setSearch={setFreeTextFilter}
            placeholder="חפש לפי טקסט חופשי"
          />
          <FilterHeaders {... { filtersData }} />
        </div>
      )}
      <TableContainer
        component={Paper}
        sx={{ marginTop: openFilter ? 0 : '70px' }}
      >
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            {... { order, orderBy }}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {filteredStars.slice().sort(getComparator(order, orderBy))
              .map((row) => (
                <Row
                  key={row.name}
                  {... { row, updateStar, userRole }}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StarsHistory;
