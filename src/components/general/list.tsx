import {
  List as MuiList,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { DeleteOutlined, StarOutline } from '@mui/icons-material';

interface Props {
    list: string[];
    deletable?: boolean;
    handleDeleteItem?: (param: string) => void;
    generateStar?: (param: string) => void;
}

const List = ({ list, deletable, handleDeleteItem, generateStar }: Props) => (
  <MuiList>
    {list.map((f: string, index: number) => (
      <ListItem key={f} sx={{ textAlign: 'start' }}>
        {deletable && handleDeleteItem && (
        <IconButton edge="end" onClick={() => handleDeleteItem(f)}>
          <DeleteOutlined color="error" />
        </IconButton>
        )}
        <ListItemText primary={`${index + 1}. ${f}`} />
        {generateStar && (
          <IconButton onClick={() => generateStar(f)}>
            <StarOutline color="warning" />
          </IconButton>
        )}
      </ListItem>
    ))}
  </MuiList>
);

export default List;

List.defaultProps = {
  deletable: false,
  handleDeleteItem: undefined,
  generateStar: undefined,
};
