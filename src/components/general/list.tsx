import {
  List as MuiList,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';

interface Props {
    list: string[];
    deletable: boolean;
    handleDeleteItem?: (param: string) => void;
}

const List = ({ list, deletable, handleDeleteItem }: Props) => (
  <MuiList>
    {list.map((f: string, index: number) => (
      <ListItem key={f} sx={{ textAlign: 'start' }}>
        {deletable && handleDeleteItem && (
        <IconButton edge="end" onClick={() => handleDeleteItem(f)}>
          <DeleteOutlined color="error" />
        </IconButton>
        )}
        <ListItemText primary={`${index + 1}. ${f}`} />
      </ListItem>
    ))}
  </MuiList>
);

export default List;

List.defaultProps = {
  handleDeleteItem: undefined,
};
