import { commentType, notesExample } from "../../assets/star";
import { Typography } from '@mui/material';
import Note from "./note";

const StarNotes = () => {
    return <div className="starNotes">
        <Typography variant="h5"  paddingBottom="10px">הערות</Typography>
        {notesExample.map((note: commentType, key) => {
            return <Note note={note} replyBranch={0} key={key} />
        })}
    </div>
}

export default StarNotes;