import { useState } from 'react';
import { Table, TableRow } from '@mui/material';
import {
  CheckCircleOutline,
  PersonOutline,
  Flight,
  FlashOn,
  Computer,
  DateRange,
} from '@mui/icons-material';
import { FilterDataType, FilterField } from '../../../types/configurations';
import {
  STATUSES,
  ASSIGNEES,
  BLOCKS,
  RESOURCES,
  RAAM_COMPUTERS,
  BAZ_COMPUTERS,
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

  const filterEmpty = filtersData.every((sf) => sf.filter.length === 0);

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
      name: 'status',
      activation: 'options',
      options: STATUSES,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline />,
    },
    {
      name: 'assignee',
      activation: 'options',
      options: ASSIGNEES,
      displayName: 'אחראי',
      icon: <PersonOutline />,
    },
    {
      name: 'date',
      activation: 'calender',
      displayName: 'תאריך',
      icon: <DateRange />,
    },
    {
      name: 'block',
      activation: 'options',
      options: BLOCKS,
      displayName: 'בלוק',
      icon: <Flight />,
    },
    {
      name: 'resource',
      activation: 'options',
      options: RESOURCES,
      displayName: 'משאבים',
      icon: <FlashOn />,
    },
    {
      name: 'computer',
      activation: 'options',
      options: RAAM_COMPUTERS.concat(BAZ_COMPUTERS),
      displayName: 'מחשב',
      icon: <Computer />,
    },
  ];

  return (
    <Table sx={{ marginBottom: getFilterMargin() }}>
      <TableRow>
        {filterFields.map((field: FilterField) => (
          <FilterTab
            key={field.name}
            field={field}
            lastTab={(displayOptions || search) ? lastTab : ''}
            handleFilterChoice={handleFilterChoice}
          />
        ))}
      </TableRow>
      <div className="historyFilter">
        <FilterManager
          lastTab={lastTab}
          displayOptions={displayOptions}
          displaySearch={displaySearch}
          filtersData={filtersData}
          options={options}
          searchValue={search}
          setSearchValue={setSearch}
          isDatePick={isDatePick}
          setIsDatePick={setIsDatePick}
        />
      </div>
    </Table>
  );
};

export default FilterHeaders;
