import { TextField, Avatar, Button } from "@mui/material";
import { noteType } from "../../../assets/star";
import { useState } from "react";

interface commentProps {
  replyTo: noteType | undefined;
  setReplyTo: (param: noteType | undefined) => void;
  addNote: (note: noteType) => void;
}

const AddComment = ({ replyTo, setReplyTo, addNote }: commentProps) => {
  const [input, setInput] = useState<string>("");

  const addComment = () => {
    let newNote: noteType = {
      id: Math.random(),
      publisher: "מיקי - מאב",
      note: input,
      time: new Date(),
      repliesTo: replyTo?.id,
    };
    
    setInput("");
    setReplyTo(undefined);
    addNote(newNote);
  };

  return (
    <div className="addComment">
      <Avatar id="avatar" alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      <TextField
        sx={{ margin: "5px", background: "white" }}
        fullWidth
        multiline
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        variant="outlined"
        placeholder={replyTo ? `תגובה ל${replyTo.publisher}` : "הוסף הערה..."}
        
      />
      <Button sx={{ height: "50px", marginTop: "10px" }} onClick={addComment}>
        פרסם
      </Button>
    </div>
  );
};
export default AddComment;
