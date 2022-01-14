import { TextField, Button, Fab } from "@mui/material";
import "../styles/expand.css";
import { starType } from "../../../assets/star";
import { NavLink } from "react-router-dom";
import { SaveOutlined, DeleteOutline } from "@material-ui/icons";

interface starProps {
  star: starType;
  setStar: (star: starType) => void;
  removeStar: (star: starType) => void;
}

const starExpand = ({ star, setStar, removeStar }: starProps) => {
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
        <NavLink to="/starfeed" onClick={() => setStar(star)}>
          <Button variant="contained" sx={{ background: "goldenrod" }}>
            עבור לעמוד הסטאר
          </Button>
        </NavLink>
        <div className="actionButtons">
          <Fab size="small" id="delete" onClick={() => removeStar(star)}>
            <DeleteOutline />
          </Fab>
          <Fab size="small" id="save" color="primary">
            <SaveOutlined />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default starExpand;
