import { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface EventProps {
    findingsNumber: number;
    addFinding: (param: string) => void;
}

const AddFinding = ({
  findingsNumber,
  addFinding,
}: EventProps) => {
  const [newFinding, setNewFinding] = useState<string>('');

  const handleAddFinding = () => {
    addFinding(newFinding);
    setNewFinding('');
  };

  return (
    <div className="addFinding">
      <div>
        <span>
          {findingsNumber + 1}
          .
          {' '}
        </span>
        <TextField
          variant="outlined"
          label="תיאור הממצא"
          value={newFinding}
          multiline
          sx={{ width: '100%', margin: '10px' }}
          onChange={(e: any) => setNewFinding(e.target.value)}
        />
      </div>
      <Button
        disabled={newFinding === ''}
        onClick={() => handleAddFinding()}
      >
        הוסף
      </Button>
    </div>
  );
};

export default AddFinding;
