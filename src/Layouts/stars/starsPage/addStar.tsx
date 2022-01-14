import { Divider } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from "@mui/material";
import "../styles/stars.css";

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
}

const statuses = ["פתוח", "בעבודה", "סגור"];
const assignees = ["מאב", "אינטגרציה", "מנט", "לצד", "אמלח"];

const AddStar = ({ isOpen, toggleModal }: starProps) => {
  return (
    <Dialog
      className="addStar"
      sx={{ textAlign: "right" }}
      open={isOpen}
      onClose={() => toggleModal(false)}
    >
      <DialogTitle>הוסף סטאר חדש</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="שם הסטאר"
            variant="standard"
            sx={{ flexGrow: 1, margin: "5px" }}
          />
          <div className="dataRow">
            <TextField label="אירוע" variant="standard" />
            <TextField label="תאריך" variant="standard" />
            <TextField label="בלוק" variant="standard" />
          </div>
          <div className="dataRow">
            <TextField fullWidth multiline label="תיאור" />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>אחראי</InputLabel>
              <Select variant="outlined" input={<Input />}>
                {assignees.map((assignee: string) => (
                  <MenuItem key={assignee} value={assignee}>
                    {assignee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>{" "}
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>סטטוס</InputLabel>
              <Select variant="outlined" input={<Input />}>
                {statuses.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="מחשב" variant="standard" />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => toggleModal(false)}
        >
          בטל
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleModal(false)}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
