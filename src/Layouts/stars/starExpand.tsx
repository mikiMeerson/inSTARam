import { TextField, Button } from "@mui/material";
import { DeleteOutline, Save } from "@mui/icons-material";
import "./styles/stars.css";
import { starType } from "../../assets/star";

interface starProps {
  star: starType;
}

const starExpand = ({ star }: starProps) => {
  return (
    <div className="starExpand">
      <div className="dataRow">
        <TextField
          sx={{ margin: "7px" }}
          label="מקור"
          defaultValue={star.publisher}
          variant="standard"
        />
        <TextField
          sx={{ margin: "7px" }}
          label="אירוע"
          defaultValue={star.event}
          variant="standard"
        />
      </div>
      <TextField
        fullWidth
        sx={{ margin: "7px" }}
        multiline
        label="תיאור"
        defaultValue={star.desc}
      />
      <div className="dataRow">
        <TextField
          sx={{ margin: "7px" }}
          label="מחשב"
          defaultValue={star.computer}
          variant="standard"
        />
      </div>
      <div className="starActions">
        <Button variant="contained">עבור לעמוד הסטאר</Button>
        <div className="actionButtons">
          <Save color="info" />
          <DeleteOutline color="error" />
        </div>
      </div>
    </div>
  );
};

export default starExpand;
