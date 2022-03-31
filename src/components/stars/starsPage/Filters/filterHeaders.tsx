import { useState } from 'react';
import { Table, TableBody } from '@mui/material';
import {
  CheckCircleOutline,
  Search,
  PersonOutline,
  DateRange,
  Flight,
  FlashOn,
  Computer,
} from '@material-ui/icons';
import DateRangePicker from '../../../general/dateRangePicker';
import FilterOptions from './filterOptions';
import FilterSelections from './filterSelections';
import { FilterDataType, FilterField } from '../../../../types/configurations';
import FilterTabs from './filterTabs';
import {
  ASSIGNEES,
  BAZ_COMPUTERS,
  BLOCKS,
  RAAM_COMPUTERS,
  RESOURCES,
  STATUSES,
} from '../../../../types/string-types';

interface Props {
  unprioritized: boolean;
  nameFilter: string;
  setNameFilter: (param: string) => void;
  filtersData: FilterDataType[];
}

const FilterHeaders = ({
  unprioritized,
  nameFilter,
  setNameFilter,
  filtersData,
}: Props) => {
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState<string>('');
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

  const filterEmpty = filtersData.every((sf) => sf.filter.length === 0)
    && nameFilter === '';

  const setFilter = (
    filter: string,
    value: string,
    action: 'add' | 'remove',
  ) => {
    const currFilter = filtersData.find((f) => f.tabName === filter);
    let newFilterValues = JSON.parse(JSON.stringify(currFilter?.filter));

    // add or remove the selected value according to the wanted action
    if (action === 'add') newFilterValues.push(value);
    else newFilterValues = newFilterValues.filter((f: string) => f !== value);

    // update the current filter by adding the new selected value
    currFilter?.func(newFilterValues);

    const itemToSet = unprioritized ? 'unprioritized' : 'prioritized';
    // save the new selected list
    localStorage.setItem(
      `${filter} filter ${itemToSet}`,
      JSON.stringify(newFilterValues),
    );
  };

  const getFilterMargin = () => {
    if ((displayOptions && !filterEmpty)
      || (search && !filterEmpty)) return '85px';
    if (displayOptions || !filterEmpty || search) return '55px';
    return 0;
  };

  const filterFields: FilterField[] = [
    {
      isPrimary: true,
      name: 'name',
      width: '120px',
      activation: 'search',
      displayName: 'שם',
      icon: <Search className="dropDownIcon" />,
    },
    {
      isPrimary: true,
      name: 'status',
      width: '40px',
      activation: 'options',
      options: STATUSES,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline className="dropDownIcon" />,
    },
    {
      isPrimary: true,
      name: 'assignee',
      width: '100px',
      activation: 'options',
      options: ASSIGNEES,
      displayName: 'אחראי',
      icon: <PersonOutline className="dropDownIcon" />,
    },
    {
      isPrimary: true,
      name: 'date',
      width: '80px',
      activation: 'calender',
      displayName: 'תאריך',
      icon: <DateRange className="dropDownIcon" />,
    },
    {
      isPrimary: true,
      name: 'block',
      width: '60px',
      activation: 'options',
      options: BLOCKS,
      displayName: 'בלוק',
      icon: <Flight className="dropdownIcon" style={{ fontSize: '17px' }} />,
    },
    {
      isPrimary: false,
      name: 'resource',
      activation: 'options',
      options: RESOURCES,
      displayName: 'משאבים',
      icon: <FlashOn className="dropDownIcon" />,
    },
    {
      isPrimary: false,
      name: 'computer',
      activation: 'options',
      options: RAAM_COMPUTERS.concat(BAZ_COMPUTERS),
      displayName: 'מחשב',
      icon: <Computer className="dropDownIcon" />,
    },
  ];

  const handleFilterChoice = (field: FilterField) => {
    if (field.activation === 'search') {
      setSearch(lastTab === 'name' ? !search : true);
      setDisplayOptions(false);
    } else if (field.activation === 'options') {
      setDisplayOptions(
        lastTab === field.name ? !displayOptions : true,
      );
      if (field.options) setOptions(field.options);
      setSearch(false);
      setLastTab(field.name);
    } else if (field.activation === 'calender') {
      setIsDatePick(!isDatePick);
    }
    setLastTab(field.name);
  };

  return (
    <Table
      className="tableHeader"
      sx={{
        marginBottom: getFilterMargin(),
      }}
    >
      <TableBody>
        <FilterTabs
          filterFields={filterFields}
          lastTab={lastTab}
          displayOptions={displayOptions}
          search={search}
          handleFilterChoice={handleFilterChoice}
          setDisplayOptions={setDisplayOptions}
          setSearch={setSearch}
        />
        {displayOptions && (
        <FilterOptions
          lastTab={lastTab}
          options={options}
          search={search}
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          filtersData={filtersData}
          setFilter={setFilter}
        />
        )}
        {!filterEmpty && (
          <FilterSelections
            isMargin={displayOptions || search}
            filtersData={filtersData}
            setFilter={setFilter}
          />
        )}
        <DateRangePicker
          isDatePick={isDatePick}
          setIsDatePick={setIsDatePick}
          dates={filtersData.find((f) => f.tabName === 'date')?.filter || []}
          setDates={filtersData.find((f) => f.tabName === 'date')!.func}
        />
      </TableBody>
    </Table>
  );
};

export default FilterHeaders;
