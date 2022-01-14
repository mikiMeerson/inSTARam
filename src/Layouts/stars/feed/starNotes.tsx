import { commentType, notesExample } from "../../../assets/star";
import { Typography } from "@mui/material";
import Note from "./note";
import AddComment from "./addComment";

const StarNotes = () => {
  return (
    <div className="feedSection">
      <div className="notesHeader">
      <Typography variant="h5" paddingBottom="10px">
        הערות
      </Typography>
      </div>
      <div style={{overflow: "scroll", height: "70%"}}> 
      {notesExample.map((note: commentType, key) => {
        return <Note note={note} replyBranch={0} key={key} />;
      })}
      </div>
      <AddComment />
    </div>
  );
};

export default StarNotes;
