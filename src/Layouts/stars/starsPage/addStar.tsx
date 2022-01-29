import { useState } from 'react';
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
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import {
  starType,
  defaultStar,
  statuses,
  assignees,
  severities,
  versions,
  computers,
} from '../../../assets/star';
import '../styles/stars.css';

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (star: starType) => void;
}

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const [newStar, setNewStar] = useState<starType>(defaultStar);

  const setAttr = (attr: keyof starType, value: string | number) => {
    setNewStar(Object.assign(newStar, { [attr]: value }));
  };

  const buildStar = () => {
    addStar(newStar);
    toggleModal(false);
  };

  return (
    <Dialog
      className="addStar"
      sx={{ textAlign: 'right' }}
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
              onChange={(e) => setAttr('name', e.target.value)}
              sx={{ width: '70%', flexGrow: 1, margin: '5px' }}
            />
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>חומרה</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={
                  (
                    e: SelectChangeEvent<string>,
                  ) => setAttr('severity', e.target.value)
                }
              >
                {severities.map((sever: string, index: number) => (
                  <MenuItem value={index + 1}>
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
              onChange={(e) => setAttr('event', e.target.value)}
            />
            <TextField
              label="תאריך"
              variant="standard"
              onChange={(e) => setAttr('date', e.target.value)}
            />
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>בלוק</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(
                  e: SelectChangeEvent<string>,
                ) => setAttr('version', e.target.value)}
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
              onChange={(e) => setAttr('desc', e.target.value)}
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>אחראי</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(
                  e: SelectChangeEvent<string>,
                ) => setAttr('assignee', e.target.value)}
              >
                {assignees.map((assignee: string) => (
                  <MenuItem key={assignee} value={assignee}>
                    {assignee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>סטטוס</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(
                  e: SelectChangeEvent<string>,
                ) => setAttr('status', e.target.value)}
              >
                {statuses.map((status: string) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '30%' }}>
              <InputLabel>מחשב</InputLabel>
              <Select
                variant="outlined"
                input={<Input />}
                onChange={(
                  e: SelectChangeEvent<string>,
                ) => setAttr('computer', e.target.value)}
              >
                {computers.map((computer: string) => (
                  <MenuItem key={computer} value={computer}>
                    {computer}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
