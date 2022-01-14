import { CancelOutlined, ReplyOutlined } from "@material-ui/icons";
import { Grid, Avatar, Typography, Divider, Button } from "@mui/material";
import { useState } from "react";
import { commentType } from "../../../assets/star";
import AddComment from "./addComment";

interface noteProps {
  note: commentType;
  replyBranch: number;
}
const Note = ({ note, replyBranch }: noteProps) => {
  const [isReply, setIsReply] = useState(false);
  const indent = (replyBranch * 40).toString() + "px";

  return (
    <>
      <Grid container sx={{ textAlign: "right", paddingRight: indent }}>
        <Grid item>
          <Avatar
            sx={{ width: 24, height: 24, margin: "7px" }}
            alt="Remy Sharp"
            src={
              "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            }
          />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h6" sx={{ fontSize: "medium", fontWeight: 600 }}>
            {note.publisher}
          </Typography>
          <Typography variant="body2">{note.comment}</Typography>
          <div className="commentActions">
            <Typography variant="caption">posted 1 minute ago</Typography>
            <ReplyOutlined
              className="replyButton"
              onClick={() => setIsReply(true)}
            />
          </div>
          <Divider />
        </Grid>
        {note.replies?.map((reply) => {
          return <Note note={reply} replyBranch={replyBranch + 1} />;
        })}
      </Grid>
      <div
        style={{
          paddingRight: indent,
          display: isReply ? "flex" : "none",
          flexDirection: "row-reverse",
          width: "100%",
        }}
      >
        <Button
          sx={{
            height: "fit-content",
            width: "fit-content",
            background: "transparent",
            color: "black",
          }}
          onClick={() => setIsReply(false)}
        >
          <CancelOutlined fontSize="small" />
        </Button>
        <AddComment />
      </div>
    </>
  );
};
export default Note;
