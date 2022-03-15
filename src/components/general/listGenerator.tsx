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
    currList: string[];
    setCurrList: (attr: any, value: any) => void;
    attr: keyof IStar | keyof IEvent;
}

const ListGenerator = ({ header, currList, setCurrList, attr }: ListProps) => {
  const [newItem, setNewItem] = useState<string>('');

  const handleAddItem = () => {
    currList.push(newItem);
    setCurrList(attr, currList);
    setNewItem('');
  };

  // !not working
  const handleDeleteItem = (deletedItem: string) => {
    currList = currList.filter((f) => f !== deletedItem);
    setCurrList(attr, currList);
  };

  return (
    <div className="list">
      <Typography variant="h6">{header}</Typography>
      <List>
        {currList.map((f, index) => (
          <ListItem key={index} sx={{ textAlign: 'start' }}>
            <IconButton edge="end" onClick={() => handleDeleteItem(f)}>
              <DeleteOutlined color="error" />
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
