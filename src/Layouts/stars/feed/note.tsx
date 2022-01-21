import { ReplyOutlined, DeleteOutline } from '@material-ui/icons';
import {
  Grid, Avatar, Typography, Divider,
} from '@mui/material';
import { useState } from 'react';
import { noteType } from '../../../assets/star';

interface noteProps {
  notes: noteType[];
  note: noteType;
  replies: noteType[];
  replyBranch: number;
  replyTo: noteType | undefined;
  setReplyTo: (param: noteType | undefined) => void;
  deleteNote: (note: noteType) => void;
}
const Note = ({
  notes,
  note,
  replies,
  replyBranch,
  replyTo,
  setReplyTo,
  deleteNote,
}: noteProps) => {
  const [isReply, setIsReply] = useState(false);

  const indent = `${(replyBranch + 40).toString()}px`;

  const getReplies = (currentNote: noteType) => notes.filter(
    (n: noteType) => n.repliesTo === currentNote.id,
  );

  const getNoteTime = () => `${note.time.getDate()}/${note.time.getMonth() + 1}/
  ${note.time.getFullYear()} ${note.time.getHours()}:${note.time.getMinutes()}`;

  return (
    <>
      <Grid container sx={{ textAlign: 'right', paddingRight: indent }}>
        <Grid item>
          <Avatar
            sx={{ width: 24, height: 24, margin: '7px' }}
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/1681010/pexels-photo-1681010
            .jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          />
        </Grid>
        <Grid
          justifyContent="left"
          item
          xs
          zeroMinWidth
          sx={{ background: replyTo === note ? 'whitesmoke' : '' }}
        >
          <Typography variant="h6" sx={{ fontSize: 'medium', fontWeight: 600 }}>
            {note.publisher}
          </Typography>
          <Typography variant="body2">{note.note}</Typography>
          <div className="commentActions">
            <Typography variant="caption">
              הועלה:
              {' '}
              {getNoteTime()}
            </Typography>
            <div className="noteActions">
              <DeleteOutline
                style={{
                  display: note.publisher === 'מיקי - מאב' ? '' : 'none',
                }}
                className="deleteButton"
                onClick={() => deleteNote(note)}
              />
              <ReplyOutlined
                className="replyButton"
                onClick={() => {
                  setIsReply(true);
                  if (replyTo === note) setReplyTo(undefined);
                  else setReplyTo(note);
                }}
              />
            </div>
          </div>
          <Divider />
        </Grid>
        {replies?.map((reply) => (
          <Note
            notes={notes}
            note={reply}
            replies={getReplies(reply)}
            replyBranch={replyBranch + 1}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
            deleteNote={deleteNote}
          />
        ))}
      </Grid>
      <div
        style={{
          paddingRight: indent,
          display: isReply ? 'flex' : 'none',
          flexDirection: 'row-reverse',
          width: '100%',
        }}
      />
    </>
  );
};
export default Note;
