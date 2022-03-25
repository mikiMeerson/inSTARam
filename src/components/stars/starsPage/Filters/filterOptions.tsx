import { TableRow, Chip } from '@mui/material';
import { filterDataType } from '../../../../types/configurations';

interface FilterProps {
    lastTab: string;
    options: string[];
    filtersData: filterDataType[];
    setFilter: (
        filter: string,
        value: string,
        action: 'add' | 'remove'
    ) => void;
}

const FilterOptions = ({
  lastTab,
  options,
  filtersData,
  setFilter,
}: FilterProps) => {
  const getOptions = () => {
    const newOptions = options.filter((o) => {
      const currentFilter = filtersData.find((f) => f.tabName === lastTab);
      if (currentFilter) return !currentFilter.filter.includes(o);
      return true;
    });
    return newOptions;
  };

  return (
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
  );
};

export default FilterOptions;
