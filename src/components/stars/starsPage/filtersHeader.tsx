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
  statuses,
  assignees,
  versions,
  resources,
  computers,
  filterDataType,
} from '../../../assets/star';

interface filterProps {
  nameFilter: string;
  setNameFilter: (param: string) => void;
  filtersData: filterDataType[];
}

const FiltersHeader = ({
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

  const setFilter = (filter: string, value: string) => {
    const currFilter = filtersData.find((f) => f.tabName === filter);
    currFilter?.func([...currFilter.filter, value]);
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
      options: statuses,
      displayName: 'סטטוס',
      icon: <CheckCircleOutline className="dropDownIcon" />,
    },
    {
      name: 'assignee',
      width: '100px',
      activation: 'options',
      options: assignees,
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
      options: versions,
      displayName: 'בלוק',
      icon: <Flight className="dropdownIcon" style={{ fontSize: '17px' }} />,
    },
  ];

  const secondaryFilterFields: filterField[] = [
    {
      name: 'resource',
      activation: 'options',
      options: resources,
      displayName: 'משאבים',
      icon: <FlashOn className="dropDownIcon" />,
    },
    {
      name: 'computer',
      activation: 'options',
      options: computers,
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

        <TableRow sx={{ display: displayMore ? '' : 'none' }}>
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

        <div
          className="searchSection"
          style={{
            display: search ? 'flex' : 'none',
          }}
        >
          <TextField
            fullWidth
            autoFocus
            variant="standard"
            label="חפש לפי שם הסטאר"
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div
          className="optionSection"
          style={{
            display: displayOptions ? 'flex' : 'none',
          }}
        >
          {getOptions().map((o: string) => (
            <Chip
              size="medium"
              sx={{ marginRight: '15px' }}
              label={o}
              key={o}
              onClick={() => {
                setFilter(lastTab, o);
              }}
            />
          ))}
        </div>

        <div
          className="filterSection"
          style={{
            display: !filterEmpty ? 'flex' : 'none',
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
                onClick={
                  () => category
                    .func(category.filter.filter((f) => f !== selected))
                }
              />
            ))
          ))}
        </div>
      </TableBody>
    </Table>
  );
};

export default FiltersHeader;
