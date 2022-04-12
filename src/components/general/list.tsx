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
    {list.map((listItem: string, index: number) => (
      <ListItem
        key={listItem}
        sx={{ textAlign: 'start', width: 'max-content' }}
      >
        {deletable && handleDeleteItem && (
        <IconButton edge="end" onClick={() => handleDeleteItem(listItem)}>
          <DeleteOutlined color="error" />
        </IconButton>
        )}
        <ListItemText primary={`${index + 1}. ${listItem}`} />
        {generateStar && (
          <IconButton onClick={() => generateStar(listItem)}>
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
