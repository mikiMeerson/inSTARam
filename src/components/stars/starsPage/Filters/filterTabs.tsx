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
    displaySearch: boolean;
    handleFilterChoice: (field: FilterField) => void;
    setDisplayOptions: (param: boolean) => void;
    setDisplaySearch: (param: boolean) => void;
}

const FilterTabs = ({
  lastTab,
  displayOptions,
  displaySearch,
  handleFilterChoice,
  setDisplayOptions,
  setDisplaySearch,
}: Props) => {
  const [displayMore, setDisplayMore] = useState<boolean>(false);

  const filterFields: FilterField[] = [
    {
      isPrimary: true,
      name: 'name',
      activation: 'displaySearch',
      displayName: 'שם',
      icon: <Search />,
    },
    {
      isPrimary: true,
      name: 'status',
      activation: 'options',
      options: STATUSES,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline />,
    },
    {
      isPrimary: true,
      name: 'assignee',
      activation: 'options',
      options: ASSIGNEES,
      displayName: 'אחראי',
      icon: <PersonOutline />,
    },
    {
      isPrimary: true,
      name: 'date',
      activation: 'calender',
      displayName: 'תאריך',
      icon: <DateRange />,
    },
    {
      isPrimary: true,
      name: 'block',
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
              setDisplaySearch(false);
            }}
          >
            <MoreVert fontSize="small" />
          </Button>
        </TableCell>
        {filterFields.filter((f) => f.isPrimary).map((field: FilterField) => (
          <FilterTab
            key={field.name}
            {... { field, handleFilterChoice }}
            lastTab={(displayOptions || displaySearch) ? lastTab : ''}
          />
        ))}
      </TableRow>
      {displayMore && (
        <TableRow>
          {filterFields.filter((f) => !f.isPrimary)
            .map((field: FilterField) => (
              <FilterTab
                key={field.name}
                {... { field, handleFilterChoice }}
                lastTab={(displayOptions || displaySearch) ? lastTab : ''}
              />
            ))}
        </TableRow>
      )}
    </>
  );
};

export default FilterTabs;
