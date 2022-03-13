import { useState } from 'react';
import {
  List,
  IconButton,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import './styles/general.css';

interface ListProps {
    header: string;
}

const ListGenerator = ({ header }: ListProps) => {
  const [currList, setCurrList] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>('');

  const handleAddItem = () => {
    setCurrList([...currList, newItem]);
    setNewItem('');
  };

  const handleDeleteItem = (deletedItem: string) => {
    setCurrList(currList.filter((f) => deletedItem !== f));
  };

  return (
    <div className="list">
      <Typography variant="h6">{header}</Typography>
      <List>
        {currList.map((f, index) => (
          <ListItem sx={{ textAlign: 'start' }}>
            <IconButton edge="end">
              <DeleteOutlined
                color="error"
                onClick={() => handleDeleteItem(f)}
              />
            </IconButton>
            <ListItemText primary={`${index + 1}. ${f}`} />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <span>
          {currList.length + 1}
          .
          {' '}
        </span>
        <TextField
          variant="outlined"
          value={newItem}
          multiline
          sx={{ width: '100%', margin: '10px' }}
          onChange={(e: any) => setNewItem(e.target.value)}
        />
      </div>
      <Button
        disabled={newItem === ''}
        onClick={() => handleAddItem()}
      >
        הוסף
      </Button>
    </div>
  );
};

export default ListGenerator;
