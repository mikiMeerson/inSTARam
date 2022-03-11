import { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { DeleteOutlined } from '@material-ui/icons';
import AddFinding from './addFinding';

const CreateEvent = () => {
  const [findings, setFindings] = useState<string[]>([]);

  const handleAddFinding = (newFinding: string) => {
    setFindings([...findings, newFinding]);
  };

  const handleDeleteFinding = (deletedFinding: string) => {
    setFindings(findings.filter((f) => deletedFinding !== f));
  };

  return (
    <div className="createEvent">
      <Typography variant="h6">ממצאים</Typography>
      <List>
        {findings.map((f, index) => (
          <ListItem sx={{ textAlign: 'start' }}>
            <IconButton edge="end">
              <DeleteOutlined
                color="error"
                onClick={() => handleDeleteFinding(f)}
              />
            </IconButton>
            <ListItemText primary={`${index + 1}. ${f}`} />
          </ListItem>
        ))}
      </List>
      <AddFinding
        findingsNumber={findings.length}
        addFinding={handleAddFinding}
      />
    </div>
  );
};

export default CreateEvent;
