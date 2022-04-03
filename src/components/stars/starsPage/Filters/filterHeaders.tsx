import { useState } from 'react';
import { Table, TableBody } from '@mui/material';
import DateRangePicker from '../../../general/dateRangePicker';
import FilterOptions from '../../../general/filterOptions';
import FilterSelections from '../../../general/filterSelections';
import { FilterDataType, FilterField } from '../../../../types/configurations';
import FilterTabs from './filterTabs';
import FilterManager from '../../../general/filterManager';

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
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [options, setOptions] = useState<string[]>([]);
  const [lastTab, setLastTab] = useState<string>('');
  const [isDatePick, setIsDatePick] = useState<boolean>(false);

  const filterEmpty = filtersData.every((sf) => sf.filter.length === 0)
    && nameFilter === '';

  const getFilterMargin = () => {
    if ((displayOptions && !filterEmpty)
      || (displaySearch && !filterEmpty)) return '85px';
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

  return (
    <Table className="tableHeader" sx={{ marginBottom: getFilterMargin() }}>
      <TableBody>
        <FilterTabs
          lastTab={lastTab}
          displayOptions={displayOptions}
          search={displaySearch}
          handleFilterChoice={handleFilterChoice}
          setDisplayOptions={setDisplayOptions}
          setSearch={setDisplaySearch}
        />
        <FilterManager
          lastTab={lastTab}
          displayOptions={displayOptions}
          displaySearch={displaySearch}
          filtersData={filtersData}
          options={options}
          searchValue={nameFilter}
          setSearchValue={setNameFilter}
          isDatePick={isDatePick}
          setIsDatePick={setIsDatePick}
          component="stars"
          unprioritized={unprioritized}
        />
      </TableBody>
    </Table>
  );
};

export default FilterHeaders;
