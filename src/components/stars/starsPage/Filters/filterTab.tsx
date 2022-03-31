import { TableCell, Button } from '@mui/material';
import { FilterField } from '../../../../types/configurations';

interface Props {
    field: FilterField;
    lastTab: string;
    handleFilterChoice: (field: FilterField) => void;
    displayOptions: boolean;
    search: boolean;
}

const FilterTab = ({
  field,
  lastTab,
  handleFilterChoice,
  displayOptions,
  search,
}: Props) => (
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
