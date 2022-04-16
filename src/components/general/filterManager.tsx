import { FilterDataType } from '../../types/configurations';
import FilterOptions from './filterOptions';
import FilterSelections from './filterSelections';
import DateRangePicker from './dateRangePicker';

interface Props {
    lastTab: string;
    displayOptions: boolean;
    displaySearch: boolean;
    filtersData: FilterDataType[];
    options: string[];
    searchValue: string;
    setSearchValue: (param: string) => void;
    isDatePick: boolean;
    setIsDatePick: (param: boolean) => void;
    component?: 'stars' | 'events';
    unprioritized?: boolean;
}

const FilterManager = ({
  lastTab,
  displayOptions,
  displaySearch,
  filtersData,
  options,
  searchValue,
  setSearchValue,
  isDatePick,
  setIsDatePick,
  component,
  unprioritized,
}: Props) => {
  const dateFilter = filtersData
    .find((filterData) => filterData.tabName === 'createdAt');

  const filterEmpty = filtersData
    .every((filterData) => filterData.filter.length === 0)
  && searchValue === '';

  const setFilter = (
    filter: string,
    value: string,
    action: 'add' | 'remove',
  ) => {
    const currFilter = filtersData
      .find((filterData) => filterData.tabName === filter);
    let newFilterValues = JSON.parse(JSON.stringify(currFilter?.filter));

    // add or remove the selected value according to the wanted action
    if (action === 'add') newFilterValues.push(value);
    else {
      newFilterValues = newFilterValues
        .filter((filterValue: string) => filterValue !== value);
    }

    // update the current filter by adding the new selected value
    currFilter?.func(newFilterValues);

    if (component) {
      const itemToSet = unprioritized ? 'unprioritized' : '';
      // save the new selected list
      localStorage.setItem(
        `${component} ${filter} ${itemToSet}`,
        JSON.stringify(newFilterValues),
      );
    }
  };

  return (
    <>
      {(displayOptions || displaySearch) && (
        <FilterOptions
          {... {
            lastTab,
            searchValue,
            setSearchValue,
            options,
            filtersData,
            setFilter,
            displaySearch,
          }}
        />
      )}
      {!filterEmpty && (
        <FilterSelections
          isMargin={displayOptions || displaySearch}
          {... { filtersData, setFilter }}
        />
      )}
      {dateFilter && (
        <DateRangePicker
          {... { isDatePick, setIsDatePick }}
          dates={dateFilter.filter || []}
          setDates={dateFilter.func}
        />
      )}
    </>
  );
};

export default FilterManager;

FilterManager.defaultProps = {
  unprioritized: false,
  component: undefined,
};
