import { ReplyOutlined, DeleteOutline } from '@material-ui/icons';
import {
  Grid, Avatar, Typography, Divider,
} from '@mui/material';
import { useState } from 'react';

interface noteProps {
  notes: INote[];
  note: INote;
  replies: INote[];
  replyBranch: number;
  replyTo: INote | undefined;
  setReplyTo: (param: INote | undefined) => void;
  deleteNote: (noteId: string) => void;
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

  const getReplies = (currentNote: INote) => notes.filter(
    (n: INote) => n.repliesTo === currentNote._id,
  );

  const getNoteTime = () => {
    const date = note.createdAt ? new Date(note.createdAt) : undefined;
    const displayDate = date
      && `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
     ${date.getHours()}:${date.getMinutes()}`;
    return displayDate;
  };

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
                onClick={() => deleteNote(note._id)}
              />
              <ReplyOutlined
                className="replyButton"
                onClick={() => {
                  setIsReply(true);
                  replyTo === note ? setReplyTo(undefined) : setReplyTo(note);
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
