import { useState } from "react";
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
import { starType } from "../../../assets/star";
import "../styles/stars.css";

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: starType) => void;
}

const statuses = ["פתוח", "בעבודה", "סגור"];
const assignees = ["מאב", "אינטגרציה", "מנט", "לצד", "אמלח"];

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [date, setDate] = useState("");
  const [version, setVersion] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [computer, setComputer] = useState("");

  const buildStar = () => {
    let newStar: starType = {
      id: 7,
      priority: 0,
      severity: 0,
      name: name,
      status: status,
      assignee: assignee,
      date: date,
      version: version,
      publisher: "מיקי - מאב",
      event: event,
      resources: [],
      desc: desc,
      computer: computer,
      notes: [],
      activity: [],
    };
    addStar(newStar);
    toggleModal(false);
  };

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
            onChange={(e) => setName(e.target.value)}
            sx={{ flexGrow: 1, margin: "5px" }}
          />
          <div className="dataRow">
            <TextField
              label="אירוע"
              variant="standard"
              onChange={(e) => setEvent(e.target.value)}
            />
            <TextField
              label="תאריך"
              variant="standard"
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              label="בלוק"
              variant="standard"
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
          <div className="dataRow">
            <TextField
              fullWidth
              multiline
              label="תיאור"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>אחראי</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(e: any) => setAssignee(e.target.value)}
              >
                {assignees.map((assignee: string) => (
                  <MenuItem key={assignee} value={assignee}>
                    {assignee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>סטטוס</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(e: any) => setStatus(e.target.value)}
              >
                {statuses.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="מחשב"
              variant="standard"
              onChange={(e) => setComputer(e.target.value)}
            />
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
          onClick={() => buildStar()}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
