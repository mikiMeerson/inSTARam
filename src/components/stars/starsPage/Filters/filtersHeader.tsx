import { ReactElement, useState } from 'react';
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
import {
  filterDataType,
  STATUSES,
  ASSIGNEES,
  COMPUTERS,
  RESOURCES,
  BLOCKS,
} from '../../../../assets';
import SearchBar from './searchBar';
import DateRangePicker from './dateRangePicker';
import FilterOptions from './filterOptions';
import FilterSelections from './filterSelections';

interface filterProps {
  unprioritized: boolean;
  nameFilter: string;
  setNameFilter: (param: string) => void;
  filtersData: filterDataType[];
}

const FiltersHeader = ({
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

  interface filterField {
    isPrimary: boolean;
    name: string;
    activation: string;
    displayName: string;
    icon: ReactElement<unknown>;
    width?: string;
    options?: string[];
  }
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
      options: Object.values(COMPUTERS),
      displayName: 'מחשב',
      icon: <Computer className="dropDownIcon" />,
    },
  ];

  return (
    <Table
      className="tableHeader"
      sx={{
        marginBottom: getFilterMargin(),
      }}
    >
      <TableBody>
        <TableRow>
          <TableCell width="20px" sx={{ textAlign: 'center' }}>
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
          {filterFields.map((field: filterField) => {
            if (field.isPrimary || displayMore) {
              return (
                <TableCell
                  key={field.name}
                  width={field.width}
                  sx={{ textAlign: 'center' }}
                >
                  <Button
                    sx={{
                      color: 'Gray',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      background:
                    lastTab === field.name && (displayOptions || search)
                      ? 'whitesmoke'
                      : '',
                    }}
                    onClick={() => {
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
                        console.log(isDatePick);
                      }
                      setLastTab(field.name);
                    }}
                  >
                    {field.displayName}
                    {field.icon}
                  </Button>
                </TableCell>
              );
            }
            return null;
          })}
        </TableRow>
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

export default FiltersHeader;
