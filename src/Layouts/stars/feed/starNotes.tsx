import { noteType } from "../../../assets/star";
import { Typography } from "@mui/material";
import Note from "./note";
import AddComment from "./addComment";
import { useState } from "react";

interface notesProps {
  notes: noteType[];
  addNote: (note: noteType) => void;
}
const StarNotes = ({ notes, addNote }: notesProps) => {
  const [replyTo, setReplyTo] = useState<noteType | undefined>(undefined);

  const getNotes = () => {
    return notes.filter((n: noteType) => n.repliesTo === undefined );
  }
  const getReplies = (note: noteType) => {
    return notes.filter((n: noteType) => n.repliesTo === note.id);
  };

  if (notes.length === 0) {
    return (
      <div className="feedSection">
        <Typography variant="caption">עדיין אין הערות על סטאר זה</Typography>
        <div style={{ display: replyTo ? "none" : "" }}>
          <AddComment replyTo={replyTo} setReplyTo={setReplyTo} addNote={addNote} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="feedSection">
        <Typography variant="h5" paddingBottom="10px" height="10%">
          הערות
        </Typography>
        <div style={{ overflow: "scroll", height: "65%" }}>
          {getNotes().map((note: noteType, key) => {
            return (
              <Note
                notes={notes}
                note={note}
                replies={getReplies(note)}
                replyBranch={0}
                key={key}
                replyTo={replyTo}
                setReplyTo={setReplyTo}
              />
            );
          })}
        </div>
        <AddComment replyTo={replyTo} addNote={addNote} setReplyTo={setReplyTo} />
      </div>
    );
  }
};

export default StarNotes;
