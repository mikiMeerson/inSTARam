import { useState } from 'react';
import { DeleteOutlined } from '@mui/icons-material';
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddFinding from './addFinding';

const AddFindings = () => {
  const [findings, setFindings] = useState<string[]>([]);

  const handleAddFinding = (newFinding: string) => {
    setFindings([...findings, newFinding]);
  };

  const handleDeleteFinding = (deletedFinding: string) => {
    setFindings(findings.filter((f) => deletedFinding !== f));
  };

  return (
    <div className="findings">
      <Typography variant="h5">ממצאים</Typography>
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

export default AddFindings;
