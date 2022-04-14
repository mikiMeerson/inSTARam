import { useState } from 'react';
import { Table, TableRow } from '@mui/material';
import {
  CheckCircleOutline,
  PersonOutline,
  Flight,
  DeveloperBoard,
  Computer,
  DateRange,
  ConnectingAirports,
} from '@mui/icons-material';
import { FilterDataType, FilterField } from '../../../types/configurations';
import {
  STATUSES,
  ASSIGNEES,
  BLOCKS,
  RAAM_COMPUTERS,
  BAZ_COMPUTERS,
  PLATFORMS,
  PHASES,
} from '../../../types/string-types';
import FilterTab from '../../general/filterTab';
import FilterManager from '../../general/filterManager';
import './styles/history.css';

interface Props {
    filtersData: FilterDataType[];
}

const FilterHeaders = ({ filtersData }: Props) => {
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [lastTab, setLastTab] = useState<string>('');
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

  const filterEmpty = filtersData
    .every((filterData) => filterData.filter.length === 0);

  const getFilterMargin = () => {
    if ((displayOptions && !filterEmpty)
      || (displaySearch && !filterEmpty)) return '105px';
    if (displayOptions || !filterEmpty || displaySearch) return '55px';
    return 0;
  };

  const handleFilterChoice = (field: FilterField) => {
    if (field.activation === 'search') {
      setDisplaySearch(lastTab === 'name' ? !displaySearch : true);
      setDisplayOptions(false);
    } else if (field.activation === 'options') {
      setDisplayOptions(
        lastTab === field.name ? !displayOptions : true,
      );
      if (field.options) setOptions(field.options);
      setDisplaySearch(false);
    } else if (field.activation === 'calender') {
      setIsDatePick(!isDatePick);
    }
    setLastTab(field.name);
  };
  const filterFields: FilterField[] = [
    {
      name: 'assignee',
      activation: 'options',
      options: ASSIGNEES,
      displayName: 'אחראי',
      icon: <PersonOutline />,
    },
    {
      name: 'status',
      activation: 'options',
      options: STATUSES,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline />,
    },
    {
      name: 'date',
      activation: 'calender',
      displayName: 'תאריך',
      icon: <DateRange />,
    },
    {
      name: 'platform',
      activation: 'options',
      options: PLATFORMS,
      displayName: 'פלטפורמה',
      icon: <Flight />,
    },
    {
      name: 'block',
      activation: 'options',
      options: BLOCKS,
      displayName: 'בלוק',
      icon: <ConnectingAirports />,
    },
    {
      name: 'computer',
      activation: 'options',
      options: RAAM_COMPUTERS.concat(BAZ_COMPUTERS),
      displayName: 'מחשב',
      icon: <Computer />,
    },
    {
      name: 'phase',
      activation: 'options',
      options: PHASES,
      displayName: 'שלב בבלוק',
      icon: <DeveloperBoard />,
    },
  ];

  return (
    <Table sx={{ marginBottom: getFilterMargin(), width: '80%' }}>
      <TableRow>
        {filterFields.map((field: FilterField) => (
          <FilterTab
            key={field.name}
            {... { field, handleFilterChoice }}
            lastTab={(displayOptions || search) ? lastTab : ''}
          />
        ))}
      </TableRow>
      <div className="historyFilter">
        <FilterManager
          {... {
            lastTab,
            displayOptions,
            displaySearch,
            filtersData,
            options,
            isDatePick,
            setIsDatePick,
          }}
          searchValue={search}
          setSearchValue={setSearch}
        />
      </div>
    </Table>
  );
};

export default FilterHeaders;
