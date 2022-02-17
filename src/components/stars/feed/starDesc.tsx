import { useState } from 'react';
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
  SelectChangeEvent,
  Grid,
  Fab,
} from '@mui/material';
import { SaveOutlined, EditOutlined } from '@mui/icons-material';
import {
  assignees,
  computers,
  resources,
  severityColors,
  statuses,
  versions,
} from '../../../assets/star';
import DialogAlert from '../../general/dialogAlert';

interface starProps {
  userRole: userRole;
  star: IStar;
  updateStar: (starId: string, formData: IStar) => void;
  saveActivity: (activityData: IActivity) => void
}

const StarDesc = ({ userRole, star, updateStar, saveActivity }: starProps) => {
  const [closeAlert, setCloseAlert] = useState<boolean>(false);
  const [isClose, setIsClose] = useState<boolean>(false);
  const [resourceList, setResourceList] = useState<string[]>(star.resources);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<IStar>(star);
  const [statusActivity, setStatusActivity] = useState<IActivity>();
  const [assigneeActivity, setAssigneeActivity] = useState<IActivity>();
  const [resourcesActivity, setResourcesActivity] = useState<IActivity>();
  const [computerActivity, setComputerActivity] = useState<IActivity>();

  const setAttr = (attr: keyof IStar, value: string | string[] | number) => {
    if (attr === 'status') {
      setCloseAlert(value === 'סגור');
      setStatusActivity({
        _id: '0',
        starId: star._id,
        publisher: localStorage.getItem('userDisplay') || 'אנונימי',
        action: 'שינת/ה את הסטטוס',
        value: value as string,
      });
    } else if (attr === 'assignee') {
      setAssigneeActivity({
        _id: '0',
        starId: star._id,
        publisher: localStorage.getItem('userDisplay') || 'אנונימי',
        action: 'שינת/ה את האחראי',
        value: value as string,
      });
    } else if (attr === 'resources') {
      setResourcesActivity({
        _id: '0',
        starId: star._id,
        publisher: localStorage.getItem('userDisplay') || 'אנונימי',
        action: 'הוסיפ/ה משאבים נדרשים',
      });
    } else if (attr === 'computer') {
      setComputerActivity({
        _id: '0',
        starId: star._id,
        publisher: localStorage.getItem('userDisplay') || 'אנונימי',
        action: 'שינת/ה את המערכת',
        value: value as string,
      });
    }
    setFormData(Object.assign(formData, { [attr]: value }));
  };

  const handleSave = () => {
    if (statusActivity) {
      saveActivity(statusActivity);
      setStatusActivity(undefined);
    }
    if (assigneeActivity) {
      saveActivity(assigneeActivity);
      setAssigneeActivity(undefined);
    }
    if (resourcesActivity) {
      saveActivity(resourcesActivity);
      setResourcesActivity(undefined);
    }
    if (computerActivity) {
      saveActivity(computerActivity);
      setComputerActivity(undefined);
    }
    setIsEdit(false);

    if (isClose) setAttr('priority', 0);
    updateStar(star._id, formData);
  };

  const getDisplayDate = () => {
    const date = star.createdAt ? new Date(star.createdAt) : undefined;
    const displayDate = date
      && `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return displayDate || '';
  };

  return (
    <div className="starDesc">
      <div className="header">
        <h1>
          <span
            id="priority"
            style={{
              color: severityColors[star.severity - 1],
            }}
          >
            {star.priority > 0 ? star.priority : ''}
            {' '}
          </span>
          <TextField
            disabled={!isEdit}
            defaultValue={star.name}
            variant="standard"
            onChange={(e) => setAttr('name', e.target.value)}
          />
        </h1>
        <Typography variant="caption">
          בלוק
          {' '}
          {star.version}
        </Typography>
        {(userRole !== 'viewer')
          && (
          <Fab
            size="small"
            color="secondary"
            sx={{
              background: isEdit ? 'blue' : 'goldenrod',
              color: 'white',
            }}
          >
            {isEdit
              ? (<SaveOutlined onClick={handleSave} />)
              : <EditOutlined onClick={() => setIsEdit(true)} />}
          </Fab>
          )}
      </div>
      <div className="starData">
        <Grid item xs={12} sx={{ marginLeft: '3%' }}>
          <Grid container>
            <Typography
              variant="caption"
              sx={{ padding: '7px', marginBottom: '10px' }}
            >
              הועלה על ידי
              {' '}
              {star.publisher}
              {' '}
              מתוך
              {' '}
              {star.event}
              {' '}
              בתאריך
              {' '}
              {getDisplayDate()}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>אחראי</InputLabel>
                <Select
                  variant="outlined"
                  disabled={!isEdit}
                  input={<Input />}
                  defaultValue={star.assignee}
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
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>סטטוס</InputLabel>
                <Select
                  variant="outlined"
                  disabled={!isEdit}
                  input={<Input />}
                  defaultValue={star.status}
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
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>בלוק</InputLabel>
                <Select
                  variant="outlined"
                  disabled={!isEdit}
                  input={<Input />}
                  defaultValue={star.version}
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
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: '3%' }}>
            <Grid item xs={8}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="resources">משאבים נדרשים</InputLabel>
                <Select
                  labelId="resources"
                  disabled={!isEdit}
                  multiple
                  value={resourceList}
                  onChange={(
                    e: SelectChangeEvent<string[]>,
                  ) => {
                    let newResources: string[] = [];
                    if (typeof e.target.value.length === 'string') {
                      newResources.push(e.target.value as string);
                    } else newResources = e.target.value as string[];
                    setResourceList(newResources);
                    setAttr('resources', newResources);
                  }}
                  input={<Input />}
                  renderValue={(selected: string[]) => (
                    <div>
                      {selected.map((value: string) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {resources.map((resource: string) => (
                    <MenuItem key={resource} value={resource}>
                      {resource}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel>מחשב</InputLabel>
                <Select
                  variant="outlined"
                  disabled={!isEdit}
                  input={<Input />}
                  defaultValue={star.computer ? star.computer : ''}
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled={!isEdit}
            sx={{
              display: 'grid',
              height: '123px',
              maxHeight: '123px',
              marginTop: '42px',
            }}
            label="תיאור"
            defaultValue={star.desc}
            variant="outlined"
            multiline
            onChange={(e) => setAttr('desc', e.target.value)}
          />
        </Grid>
      </div>
      <DialogAlert
        header="שים לב!"
        content="לאחר סגירת הסטאר הוא ייעלם מדף הניהול.
         ניתן למצוא אותו בדף ההיסטוריה"
        isOpen={closeAlert}
        setIsOpen={setCloseAlert}
        activateResponse={setIsClose}
        param
      />
    </div>
  );
};

export default StarDesc;
