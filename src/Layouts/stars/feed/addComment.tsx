import { Close } from "@material-ui/icons";
import { TextField, Avatar, Button } from "@mui/material";

const AddComment = () => {

  return (
    <div className="addComment">
      <Avatar id="avatar" alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
      <TextField
        sx={{ margin: "5px", background: "white" }}
        fullWidth
        multiline
        variant="outlined"
        placeholder="הוסף הערה..."
      />
      <Button sx={{height: "50px", marginTop: "10px"}}>פרסם</Button>
    </div>
  );
};
export default AddComment;
