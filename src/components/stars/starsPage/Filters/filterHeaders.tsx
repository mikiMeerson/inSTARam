import { useState } from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import {
  CheckCircleOutline,
  Search,
  PersonOutline,
  DateRange,
  Flight,
  MoreVert,
  FlashOn,
  Computer,
} from '@material-ui/icons';
import SearchBar from './searchBar';
import DateRangePicker from './dateRangePicker';
import FilterOptions from './filterOptions';
import FilterSelections from './filterSelections';
import { filterDataType, filterField } from '../../../../types/configurations';
import {
  ASSIGNEES,
  BAZ_COMPUTERS,
  BLOCKS,
  RAAM_COMPUTERS,
  RESOURCES,
  STATUSES,
} from '../../../../types/enums';
import FilterTab from './filterTab';

interface filterProps {
  unprioritized: boolean;
  nameFilter: string;
  setNameFilter: (param: string) => void;
  filtersData: filterDataType[];
}

const FilterHeaders = ({
  unprioritized,
  nameFilter,
  setNameFilter,
  filtersData,
}: filterProps) => {
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState<string>('');
  const [displayMore, setDisplayMore] = useState<boolean>(false);
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

  const filterFields: filterField[] = [
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
      options: Object.values(STATUSES),
      displayName: 'סטטוס',
      icon: <CheckCircleOutline className="dropDownIcon" />,
    },
    {
      isPrimary: true,
      name: 'assignee',
      width: '100px',
      activation: 'options',
      options: Object.values(ASSIGNEES),
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
      options: Object.values(BLOCKS),
      displayName: 'בלוק',
      icon: <Flight className="dropdownIcon" style={{ fontSize: '17px' }} />,
    },
    {
      isPrimary: false,
      name: 'resource',
      activation: 'options',
      options: Object.values(RESOURCES),
      displayName: 'משאבים',
      icon: <FlashOn className="dropDownIcon" />,
    },
    {
      isPrimary: false,
      name: 'computer',
      activation: 'options',
      options: (Object.values(RAAM_COMPUTERS) as string[])
        .concat((Object.values(BAZ_COMPUTERS) as string[])),
      displayName: 'מחשב',
      icon: <Computer className="dropDownIcon" />,
    },
  ];

  const handleFilterChoice = (field: filterField) => {
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
        <TableRow>
          <TableCell sx={{ width: '20px', textAlign: 'center' }}>
            <Button sx={{ textAlign: 'center' }}>
              <MoreVert
                fontSize="small"
                onClick={() => {
                  setDisplayMore(!displayMore);
                  setDisplayOptions(false);
                  setSearch(false);
                }}
              />
            </Button>
          </TableCell>
          {filterFields.filter((f) => f.isPrimary).map((field: filterField) => (
            <FilterTab
              field={field}
              lastTab={lastTab}
              handleFilterChoice={handleFilterChoice}
              displayOptions={displayOptions}
              search={search}
            />
          ))}
        </TableRow>
        {displayMore && (
        <TableRow>
          {filterFields.filter((f) => !f.isPrimary)
            .map((field: filterField) => (
              <FilterTab
                field={field}
                lastTab={lastTab}
                handleFilterChoice={handleFilterChoice}
                displayOptions={displayOptions}
                search={search}
              />
            ))}
        </TableRow>
        )}
        {search && (
          <SearchBar nameFilter={nameFilter} setNameFilter={setNameFilter} />
        )}
        <DateRangePicker
          isDatePick={isDatePick}
          setIsDatePick={setIsDatePick}
          filtersData={filtersData}
        />
        {displayOptions && (
        <FilterOptions
          lastTab={lastTab}
          options={options}
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
      </TableBody>
    </Table>
  );
};

export default FilterHeaders;
