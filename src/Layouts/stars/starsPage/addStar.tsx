/* eslint-disable @typescript-eslint/ban-types */
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
  defaultStar,
  assignees,
  severities,
  versions,
  computers,
} from '../../../assets/star';
import '../styles/stars.css';

interface starProps {
  isOpen: boolean;
  toggleModal: (param: boolean) => void;
  addStar: (e: React.FormEvent, star: IStar) => void;
}

const AddStar = ({ isOpen, toggleModal, addStar }: starProps) => {
  const [formData, setFormData] = useState<IStar | never>(defaultStar);

  const setAttr = (attr: keyof IStar, value: string | number) => {
    setFormData(Object.assign(formData, { [attr]: value }));
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
              onChange={(e) => setAttr('event', e.target.value)}
            />
            <FormControl sx={{ width: '45%' }}>
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
            <FormControl sx={{ width: '45%' }}>
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
            <FormControl sx={{ width: '45%' }}>
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
          disabled={formData === undefined}
          onClick={(e) => {
            // todo validate all fields
            toggleModal(false);
            formData && addStar(e, formData);
          }}
        >
          הוסף
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStar;
