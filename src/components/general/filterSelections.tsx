import { TableRow, Chip } from '@mui/material';
import { FilterDataType } from '../../types/configurations';

interface Props {
    isMargin: boolean;
    filtersData: FilterDataType[];
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
}: Props) => {
  const getDisplayDate = (date: Date) => {
    const displayDate = `
    ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
    `;
    return displayDate;
  };

  return (
    <TableRow
      className="filterSection"
      sx={{
        display: 'flex',
        marginTop: isMargin ? '50px' : 0,
      }}
    >
      {filtersData.map((category) => {
        if (category.tabName === 'createdAt') {
          if (category.filter.length === 2) {
            return (
              <Chip
                size="medium"
                color={category.chipColor}
                label={`${getDisplayDate(new Date(category.filter[1]))}
              ${' - '}
              ${getDisplayDate(new Date(category.filter[0]))}`}
                sx={{
                  marginRight: '15px',
                }}
                onClick={() => {
                  category.filter.forEach((date) => {
                    setFilter(category.tabName, date, 'remove');
                  });
                }}
              />
            );
          }
        }
        return (
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
        );
      })}
    </TableRow>
  );
};

export default FilterSelections;
