import { useEffect, useState } from 'react';
import {
  List,
  IconButton,
  ListItem,
  ListItemText,
  Button,
  TextField,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import './styles/general.css';
import { IEvent } from '../../types/interfaces';

interface Props {
    header: string;
    event: IEvent;
    setCurrList: (attr: keyof IEvent, value: IEvent[keyof IEvent]) => void;
    attr: keyof IEvent;
}

const ListGenerator = ({ header, event, setCurrList, attr }: Props) => {
  const [newItem, setNewItem] = useState<string>('');
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    setList(event[attr] as string[]);
  }, [event, attr]);

  const handleAddItem = () => {
    setCurrList(attr, [...(event[attr] as string[]), newItem]);
    setList(event[attr] as string[]);
    setNewItem('');
  };

  const handleKeyDown = (e: SelectChangeEvent) => {
    if (e.key === 'Enter' && newItem.trim().length > 0) handleAddItem();
  };

  const handleDeleteItem = (deletedItem: string) => {
    setCurrList(attr, (event[attr] as string[])
      .filter((listItem: string) => listItem !== deletedItem));
    setList(event[attr] as string[]);
  };

  return (
    <div className="list">
      <Typography variant="h6">{header}</Typography>
      <List>
        {list.map((listItem: string, index: number) => (
          <ListItem key={listItem} sx={{ textAlign: 'start' }}>
            <IconButton edge="end" onClick={() => handleDeleteItem(listItem)}>
              <DeleteOutlined color="error" />
            </IconButton>
            <ListItemText primary={`${index + 1}. ${listItem}`} />
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <span>{`${list.length + 1}. `}</span>
        <TextField
          variant="outlined"
          value={newItem}
          multiline
          sx={{ width: '100%', margin: '10px' }}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button disabled={newItem === ''} onClick={() => handleAddItem()}>
        הוסף
      </Button>
    </div>
  );
};

export default ListGenerator;
