import { TableRow, Chip } from '@mui/material';
import { filterDataType } from '../../../../assets';

interface FilterProps {
    isMargin: boolean;
    filtersData: filterDataType[];
    setFilter: (
        filter: string,
        value: string,
        action: 'add' | 'remove'
    ) => void;
}
const FilterSelections = ({
  isMargin,
  filtersData,
  setFilter,
}: FilterProps) => (
  <TableRow
    className="filterSection"
    sx={{
      display: 'flex',
      marginTop: isMargin ? '50px' : 0,
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
);

export default FilterSelections;
