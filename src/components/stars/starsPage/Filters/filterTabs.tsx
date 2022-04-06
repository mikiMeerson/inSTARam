import { useState } from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import {
  MoreVert,
  CheckCircleOutline,
  Search,
  PersonOutline,
  DateRange,
  Flight,
  FlashOn,
  Computer,
} from '@mui/icons-material';
import {
  ASSIGNEES,
  BAZ_COMPUTERS,
  BLOCKS,
  RAAM_COMPUTERS,
  RESOURCES,
  STATUSES,
} from '../../../../types/string-types';
import { FilterField } from '../../../../types/configurations';
import FilterTab from '../../../general/filterTab';

interface Props {
    lastTab: string;
    displayOptions: boolean;
    search: boolean;
    handleFilterChoice: (field: FilterField) => void;
    setDisplayOptions: (param: boolean) => void;
    setSearch: (param: boolean) => void;
}

const FilterTabs = ({
  lastTab,
  displayOptions,
  search,
  handleFilterChoice,
  setDisplayOptions,
  setSearch,
}: Props) => {
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  const filterFields: FilterField[] = [
    {
      isPrimary: true,
      name: 'name',
      width: '120px',
      activation: 'search',
      displayName: 'שם',
      icon: <Search />,
    },
    {
      isPrimary: true,
      name: 'status',
      width: '40px',
      activation: 'options',
      options: STATUSES,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline />,
    },
    {
      isPrimary: true,
      name: 'assignee',
      width: '100px',
      activation: 'options',
      options: ASSIGNEES,
      displayName: 'אחראי',
      icon: <PersonOutline />,
    },
    {
      isPrimary: true,
      name: 'date',
      width: '80px',
      activation: 'calender',
      displayName: 'תאריך',
      icon: <DateRange />,
    },
    {
      isPrimary: true,
      name: 'block',
      width: '60px',
      activation: 'options',
      options: BLOCKS,
      displayName: 'בלוק',
      icon: <Flight />,
    },
    {
      isPrimary: false,
      name: 'resource',
      activation: 'options',
      options: RESOURCES,
      displayName: 'משאבים',
      icon: <FlashOn />,
    },
    {
      isPrimary: false,
      name: 'computer',
      activation: 'options',
      options: RAAM_COMPUTERS.concat(BAZ_COMPUTERS),
      displayName: 'מחשב',
      icon: <Computer />,
    },
  ];

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: '20px', textAlign: 'center' }}>
          <Button
            sx={{ textAlign: 'center' }}
            onClick={() => {
              setDisplayMore(!displayMore);
              setDisplayOptions(false);
              setSearch(false);
            }}
          >
            <MoreVert fontSize="small" />
          </Button>
        </TableCell>
        {filterFields.filter((f) => f.isPrimary).map((field: FilterField) => (
          <FilterTab
            key={field.name}
            field={field}
            lastTab={(displayOptions || search) ? lastTab : ''}
            handleFilterChoice={handleFilterChoice}
          />
        ))}
      </TableRow>
      {displayMore && (
        <TableRow>
          {filterFields.filter((f) => !f.isPrimary)
            .map((field: FilterField) => (
              <FilterTab
                key={field.name}
                field={field}
                lastTab={(displayOptions || search) ? lastTab : ''}
                handleFilterChoice={handleFilterChoice}
              />
            ))}
        </TableRow>
      )}
    </>
  );
};

export default FilterTabs;
