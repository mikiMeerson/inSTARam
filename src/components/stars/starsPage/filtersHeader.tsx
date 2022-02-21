import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  TextField,
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
import { ReactElement, useState } from 'react';
import {
  filterDataType,
  STATUSES,
  ASSIGNEES,
  COMPUTERS,
  RESOURCES,
  VERSIONS,
} from '../../../assets/utils';

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
  const [displayOptions, setDisplayOptions] = useState(false);
  const [search, setSearch] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState('');
  const [displayMore, setDisplayMore] = useState(false);

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

  const getOptions = () => {
    const newOptions = options.filter((o) => {
      const currentFilter = filtersData.find((f) => f.tabName === lastTab);
      if (currentFilter) return !currentFilter.filter.includes(o);
      return true;
    });
    return newOptions;
  };

  interface filterField {
    name: string;
    activation: string;
    displayName: string;
    icon: ReactElement<unknown>;
    width?: string;
    options?: string[];
  }
  const primaryFilterFields: filterField[] = [
    {
      name: 'name',
      width: '120px',
      activation: 'search',
      displayName: 'שם',
      icon: <Search className="dropDownIcon" />,
    },
    {
      name: 'status',
      width: '40px',
      activation: 'options',
      options: Object.values(STATUSES),
      displayName: 'סטטוס',
      icon: <CheckCircleOutline className="dropDownIcon" />,
    },
    {
      name: 'assignee',
      width: '100px',
      activation: 'options',
      options: Object.values(ASSIGNEES),
      displayName: 'אחראי',
      icon: <PersonOutline className="dropDownIcon" />,
    },
    {
      name: 'date',
      width: '80px',
      activation: 'none',
      displayName: 'תאריך',
      icon: <DateRange className="dropDownIcon" />,
    },
    {
      name: 'version',
      width: '60px',
      activation: 'options',
      options: Object.values(VERSIONS),
      displayName: 'בלוק',
      icon: <Flight className="dropdownIcon" style={{ fontSize: '17px' }} />,
    },
  ];

  const secondaryFilterFields: filterField[] = [
    {
      name: 'resource',
      activation: 'options',
      options: Object.values(RESOURCES),
      displayName: 'משאבים',
      icon: <FlashOn className="dropDownIcon" />,
    },
    {
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
          {primaryFilterFields.map((field: filterField) => (
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
                  }
                  setLastTab(field.name);
                }}
              >
                {field.displayName}
                {field.icon}
              </Button>
            </TableCell>
          ))}
        </TableRow>

        {displayMore && (
          <TableRow>
            <TableCell width="60px" />

            {secondaryFilterFields.map((field: filterField) => (
              <TableCell key={field.name} sx={{ textAlign: 'center' }}>
                <Button
                  sx={{
                    color: 'Gray',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    paddingLeft: 0,
                    background:
                      lastTab === field.name && (displayOptions || search)
                        ? 'whitesmoke'
                        : '',
                  }}
                  onClick={() => {
                    setDisplayOptions(
                      lastTab === field.name ? !displayOptions : true,
                    );
                    if (field.options) setOptions(field.options);
                    setSearch(false);
                    setLastTab(field.name);
                  }}
                >
                  {field.displayName}
                  {field.icon}
                </Button>
              </TableCell>
            ))}
          </TableRow>
        )}

        {search && (
          <TableRow
            className="searchSection"
            sx={{
              display: 'flex',
            }}
          >
            <TextField
              fullWidth
              autoFocus
              variant="standard"
              label="חפש לפי שם הסטאר"
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </TableRow>
        )}
        {displayOptions && (
          <TableRow
            className="optionSection"
            sx={{ display: 'flex' }}
          >
            {getOptions().map((o: string) => (
              <Chip
                size="medium"
                sx={{ marginRight: '15px' }}
                label={o}
                key={o}
                onClick={() => { setFilter(lastTab, o, 'add'); }}
              />
            ))}
          </TableRow>
        )}
        {!filterEmpty && (
          <TableRow
            className="filterSection"
            sx={{
              display: 'flex',
              marginTop: displayOptions || search ? '50px' : 0,
            }}
          >
            {filtersData.map((category) => (
              category.filter.map((selected) => (
                <Chip
                  key={selected}
                  size="medium"
                  color={category.chipColor}
                  label={selected}
                  sx={{
                    marginRight: '15px',
                  }}
                  onClick={() => {
                    setFilter(category.tabName, selected, 'remove');
                  }}
                />
              ))
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
