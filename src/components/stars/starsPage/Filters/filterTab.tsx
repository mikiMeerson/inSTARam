import { TableCell, Button } from '@mui/material';
import { filterField } from '../../../../types/configurations';

interface TabProps {
    field: filterField;
    lastTab: string;
    handleFilterChoice: (field: filterField) => void;
    displayOptions: boolean;
    search: boolean;
}

const FilterTab = ({
  field,
  lastTab,
  handleFilterChoice,
  displayOptions,
  search,
}: TabProps) => (
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
      onClick={() => handleFilterChoice(field)}
    >
      {field.displayName}
      {field.icon}
    </Button>
  </TableCell>
);

export default FilterTab;
