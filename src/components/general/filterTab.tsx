import { TableCell, Button } from '@mui/material';
import { FilterField } from '../../types/configurations';

interface Props {
    field: FilterField;
    lastTab: string;
    handleFilterChoice: (field: FilterField) => void;
}

const FilterTab = ({
  field,
  lastTab,
  handleFilterChoice,
}: Props) => (
  <TableCell
    key={field.name}
    sx={{ textAlign: 'center' }}
  >
    <Button
      sx={{
        color: 'Gray',
        fontWeight: 'bold',
        textAlign: 'center',
        background:
        lastTab === field.name ? 'whitesmoke' : '',
      }}
      onClick={() => handleFilterChoice(field)}
    >
      {field.displayName}
      <span style={{ margin: '10px 5px 0 0', fontSize: '17px' }}>
        {field.icon}
      </span>
    </Button>
  </TableCell>
);

export default FilterTab;
