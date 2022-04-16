import { useEffect, useState, useCallback } from 'react';
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

  const getFiltersData = useCallback((): FilterDataType[] => ([
    {
      tabName: 'status',
      filter: statusFilter,
      func: setStatusFilter,
      filterType: 'single',
      chipColor: 'primary',
    },
    {
      tabName: 'assignee',
      filter: assigneeFilter,
      func: setAssigneeFilter,
      filterType: 'single',
      chipColor: 'secondary',
    },
    {
      tabName: 'platform',
      filter: platformFilter,
      func: setPlatformFilter,
      filterType: 'single',
      chipColor: 'error',
    },
    {
      tabName: 'block',
      filter: blockFilter,
      func: setBlockFilter,
      filterType: 'single',
      chipColor: 'warning',
    },
    {
      tabName: 'phase',
      filter: phaseFilter,
      func: setPhaseFilter,
      filterType: 'single',
      chipColor: 'default',
    },
    {
      tabName: 'computer',
      filter: computerFilter,
      func: setComputerFilter,
      filterType: 'single',
      chipColor: 'info',
    },
    {
      tabName: 'createdAt',
      filter: dateFilter,
      func: setDateFilter,
      filterType: 'date',
      chipColor: 'error',
    },
  ]), [
    assigneeFilter,
    blockFilter,
    computerFilter,
    dateFilter,
    phaseFilter,
    platformFilter,
    statusFilter,
  ]);

  useEffect(() => {
    const checkFilter = (filterData: FilterDataType, star: IStar): boolean => {
      if (filterData.filterType === 'single') {
        return filterData.filter.length === 0
          || filterData.filter
            .includes(star[filterData.tabName as keyof IStar] as string);
      }
      // filterType is date
      const creationDate = star[filterData.tabName as keyof IStar] as string;
      return filterData.filter.length === 0
        || (new Date(creationDate) >= new Date(filterData.filter[0])
          && new Date(creationDate) <= new Date(
            new Date(filterData.filter[1]).getFullYear(),
            new Date(filterData.filter[1]).getMonth(),
            new Date(filterData.filter[1]).getDate() + 1,
          )
        );
    };

    const checkFreeTextFilter = (filter: string, star: IStar): boolean => (
      filter === '' || star.name.includes(filter) || star.desc.includes(filter)
    );

    const fetchStars = async () => {
      const { status, data } = await getStars();
      if (status !== StatusCodes.OK) console.log('Could not fetch stars');
      else setStars(data.stars);
    };

    if (stars.length === 0) fetchStars();
    const tempFilteredStars: IStar[] = [];
    stars.forEach((star) => {
      if (checkFreeTextFilter(freeTextFilter, star) && getFiltersData()
        .every((filterData) => checkFilter(filterData, star))) {
        tempFilteredStars.push(star);
      }
    });
    setFilteredStars(tempFilteredStars);
  }, [getFiltersData, freeTextFilter, stars]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IStar,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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
          <FilterHeaders filtersData={getFiltersData()} />
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
