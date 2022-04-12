import { useState } from 'react';
import {
  ComputerOutlined,
  Flight,
  PersonOutline,
} from '@mui/icons-material';
import { TableRow } from '@mui/material';
import { FilterDataType, FilterField } from '../../../types/configurations';
import { BLOCKS, PLATFORMS } from '../../../types/string-types';
import FilterTab from '../../general/filterTab';
import FilterManager from '../../general/filterManager';

interface Props {
  filtersData: FilterDataType[];
  assigneeFilter: string;
  setAssigneeFilter: (param: string) => void;
}

const FilterHeaders = ({
  filtersData,
  assigneeFilter,
  setAssigneeFilter,
}: Props) => {
  const [lastTab, setLastTab] = useState<string>('');
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

  const filterFields: FilterField[] = [
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
      icon: <ComputerOutlined />,
    },
    {
      name: 'assignee',
      activation: 'search',
      displayName: 'גוף מבצע',
      icon: <PersonOutline />,
    },
  ];

  const handleFilterChoice = (field: FilterField) => {
    if (field.activation === 'search') {
      setDisplaySearch(lastTab === 'assignee' ? !displaySearch : true);
      setDisplayOptions(false);
    } else if (field.activation === 'options') {
      setDisplayOptions(lastTab === field.name ? !displayOptions : true);
      setDisplaySearch(false);
      if (field.options) setOptions(field.options);
    } else if (field.activation === 'calender') {
      setIsDatePick(!isDatePick);
    }
    setLastTab(field.name);
  };

  return (
    <>
      <TableRow>
        {filterFields.map((field: FilterField) => (
          <FilterTab
            key={field.name}
            {... { field, lastTab, handleFilterChoice }}
          />
        ))}
      </TableRow>
      <div className="eventsFilter">
        <FilterManager
          {... {
            lastTab,
            displaySearch,
            displayOptions,
            filtersData,
            options,
            isDatePick,
            setIsDatePick,
          }}
          searchValue={assigneeFilter}
          setSearchValue={setAssigneeFilter}
          component="events"
        />
      </div>
    </>
  );
};

export default FilterHeaders;
