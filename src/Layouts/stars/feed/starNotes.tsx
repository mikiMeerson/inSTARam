import { commentType } from "../../../assets/star";
import { Typography } from "@mui/material";
import Note from "./note";
import AddComment from "./addComment";

interface notesProps {
  notes: commentType[];
}
const StarNotes = ({ notes }: notesProps) => {
  if (notes.length === 0) {
    return (
      <div className="feedSection">
        <Typography variant="caption">עדיין אין הערות על סטאר זה</Typography>
        <AddComment />
      </div>
    );
  } else {
    return (
      <div className="feedSection">
        <div className="notesHeader">
          <Typography variant="h5" paddingBottom="10px">
            הערות
          </Typography>
        </div>
        <div style={{ overflow: "scroll", height: "70%" }}>
          {notes.map((note: commentType, key) => {
            return <Note note={note} replyBranch={0} key={key} />;
          })}
        </div>
        <AddComment />
      </div>
    );
  }
};

export default StarNotes;
