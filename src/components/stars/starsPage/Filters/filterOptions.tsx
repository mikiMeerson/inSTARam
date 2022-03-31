import { TableRow, Chip } from '@mui/material';
import { FilterDataType } from '../../../../types/configurations';
import SearchBar from './searchBar';

interface Props {
    lastTab: string;
    options: string[];
    search: boolean;
    nameFilter: string;
    setNameFilter: (param: string) => void;
    filtersData: FilterDataType[];
    setFilter: (
        filter: string,
        value: string,
        action: 'add' | 'remove'
    ) => void;
}

const FilterOptions = ({
  lastTab,
  search,
  nameFilter,
  setNameFilter,
  options,
  filtersData,
  setFilter,
}: Props) => {
  const getOptions = () => {
    const newOptions = options.filter((o) => {
      const currentFilter = filtersData.find((f) => f.tabName === lastTab);
      if (currentFilter) return !currentFilter.filter.includes(o);
      return true;
    });
    return newOptions;
  };

  return (
    <>
      {search && (
        <SearchBar nameFilter={nameFilter} setNameFilter={setNameFilter} />
      )}
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
    </>
  );
};

export default FilterOptions;
