import { commentType, notesExample } from "../../assets/star";
import { TextField, Typography, Button } from "@mui/material";
import Note from "./note";

const StarNotes = () => {
  return (
    <div className="feedSection">
      <Typography variant="h5" paddingBottom="10px">
        הערות
      </Typography>
      {notesExample.map((note: commentType, key) => {
        return <Note note={note} replyBranch={0} key={key} />;
      })}
      <TextField
        fullWidth
        multiline
        variant="outlined"
        placeholder="הוסף הערה..."
        sx={{ marginTop: "5px" }}
      />
    </div>
  );
};

export default StarNotes;
