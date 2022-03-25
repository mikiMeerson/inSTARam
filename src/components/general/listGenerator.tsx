import { useEffect, useState } from 'react';
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
    event: IEvent;
    setCurrList: (attr: any, value: any) => void;
    attr: keyof IEvent;
}

const ListGenerator = ({ header, event, setCurrList, attr }: ListProps) => {
  const [newItem, setNewItem] = useState<string>('');
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    console.log(event.generalSummary);
    setList(event[attr]);
  }, [event, attr]);

  const handleAddItem = () => {
    setCurrList(attr, [...event[attr], newItem]);
    setList(event[attr]);
    setNewItem('');
  };

  const handleDeleteItem = (deletedItem: string) => {
    setCurrList(attr, event[attr].filter((f: string) => f !== deletedItem));
    setList(event[attr]);
  };

  return (
    <div className="list">
      <Typography variant="h6">{header}</Typography>
      <List>
        {list.map((f: string, index: number) => (
          <ListItem key={f} sx={{ textAlign: 'start' }}>
            <IconButton edge="end" onClick={() => handleDeleteItem(f)}>
              <DeleteOutlined color="error" />
            </IconButton>
            <ListItemText primary={`${index + 1}. ${f}`} />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <span>
          {list.length + 1}
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
