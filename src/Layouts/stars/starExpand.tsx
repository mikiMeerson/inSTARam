import { TextField } from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import "./stars.css";

const starExpand = () => {
  return (
    <div className="starExpand">
      <div className="dataRow">
        <TextField
          sx={{ margin: "7px" }}
          label="מקור"
          defaultValue="גדות - מאב"
          variant="standard"
        />
        <TextField
          sx={{ margin: "7px" }}
          label="אירוע"
          defaultValue="גיחת ניסוי בלוק ו רעם"
          variant="standard"
        />
      </div>
      <TextField
        fullWidth
        sx={{ margin: "7px" }}
        multiline
        label="תיאור"
        defaultValue="הצמדת יעף עובדת בצורה לא דטרמיניסטית ממסכים שונים. כשההצמדה עובדת היעף מנצנץ ב-BM בניגוד לאפיון."
      />
      <div className="dataRow">
        <TextField
          sx={{ margin: "7px" }}
          label="מחשב"
          defaultValue="VHSIC"
          variant="standard"
        />
        <TextField
          sx={{ margin: "7px" }}
          label="משאב נדרש"
          defaultValue="AIF"
          variant="standard"
        />
      </div>
      <div className="starActions">
        <div className="starLink">עבור לעמוד הסטאר</div>
        <div className="actionButtons">
          <Save color="info" />
          <DeleteOutline color="error" />
        </div>
      </div>
    </div>
  );
};

export default starExpand;
