import { AccountCircle } from '@mui/icons-material';
import { TextField, Avatar, Button } from '@mui/material';
import { BaseSyntheticEvent, useState } from 'react';

interface commentProps {
  replyTo: INote | undefined;
  setReplyTo: (param: INote | undefined) => void;
  addNote: (note: INote) => void;
}

const AddComment = ({
  replyTo, setReplyTo, addNote,
}: commentProps) => {
  const [input, setInput] = useState<string>('');

  const addComment = () => {
    const newNote: INote = {
      _id: Math.random().toString(),
      starId: '0',
      publisher: 'מיקי - מאב',
      note: input,
      repliesTo: replyTo?._id,
    };

    setInput('');
    setReplyTo(undefined);
    addNote(newNote);
  };

  return (
    <div className="addComment">
      <Avatar><AccountCircle fontSize="large" /></Avatar>
      <TextField
        sx={{ margin: '5px', background: 'white' }}
        fullWidth
        multiline
        value={input}
        onChange={(e: BaseSyntheticEvent) => setInput(e.target.value)}
        variant="outlined"
        placeholder={replyTo ? `תגובה ל${replyTo.publisher}` : 'הוסף הערה...'}

      />
      <Button sx={{ height: '50px', marginTop: '10px' }} onClick={addComment}>
        פרסם
      </Button>
    </div>
  );
};
export default AddComment;
