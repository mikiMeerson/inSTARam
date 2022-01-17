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
import {
  starType,
  defaultStar,
  statuses,
  assignees,
  severities,
  versions,
} from "../../../assets/star";
import "../styles/stars.css";

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: starType) => void;
}

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const [newStar, setNewStar] = useState<starType>(defaultStar);

  const setAttr = (attr: keyof starType, value: string | number) => {
    let s = newStar;
    s[attr] = value as never;
    setNewStar(s);
  };

  const buildStar = () => {
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
          <div className="dataRow">
            <TextField
              autoFocus
              label="שם הסטאר"
              variant="standard"
              onChange={(e) => setAttr("name", e.target.value)}
              sx={{ width: "70%", flexGrow: 1, margin: "5px" }}
            />
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>חומרה</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(e: any) => setAttr("severity", e.target.value)}
              >
                {severities.map((sever: any, index: number) => (
                  <MenuItem key={index} value={index + 1}>
                    {sever}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="dataRow">
            <TextField
              label="אירוע"
              variant="standard"
              onChange={(e) => setAttr("event", e.target.value)}
            />
            <TextField
              label="תאריך"
              variant="standard"
              onChange={(e) => setAttr("date", e.target.value)}
            />
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>בלוק</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(e: any) => setAttr("version", e.target.value)}
              >
                {versions.map((version: string) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="dataRow">
            <TextField
              fullWidth
              multiline
              label="תיאור"
              onChange={(e) => setAttr("desc", e.target.value)}
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: "30%" }}>
              <InputLabel>אחראי</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(e: any) => setAttr("assignee", e.target.value)}
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
                onChange={(e: any) => setAttr("status", e.target.value)}
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
              onChange={(e) => setAttr("computer", e.target.value)}
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
