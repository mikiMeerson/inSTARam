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
  Fab,
} from '@mui/material';
import { SaveOutlined, EditOutlined } from '@mui/icons-material';
import {
  assignees,
  resources,
  severityColors,
  statuses,
} from '../../../assets/star';

interface starProps {
  star: IStar;
  updateStar: (starId: string, formData: IStar) => void;
}

const StarDesc = ({ star, updateStar }: starProps) => {
  const [resourceList, setResourceList] = useState<string[]>(star.resources);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<IStar>(star);

  const setAttr = (attr: keyof IStar, value: string | string[] | number) => {
    setFormData(Object.assign(formData, { [attr]: value }));
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
        <Fab
          size="small"
          color="secondary"
          sx={{ background: isEdit ? 'blue' : 'goldenrod', color: 'white' }}
        >
          {isEdit
            ? (
              <SaveOutlined onClick={() => {
                setIsEdit(false);
                updateStar(star._id, formData);
              }}
              />
            )
            : <EditOutlined onClick={() => setIsEdit(true)} />}
        </Fab>
      </div>
      <div className="starData">
        <div className="dataCol">
          <div className="dataRow">
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
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: '45%' }}>
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
            <FormControl sx={{ width: '45%' }}>
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
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: '90%', marginTop: '4%' }}>
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
          </div>
        </div>
        <div className="dataCol">
          <TextField
            disabled={!isEdit}
            sx={{ display: 'grid', height: '123px', marginTop: '42px' }}
            label="תיאור"
            defaultValue={star.desc}
            variant="outlined"
            multiline
            onChange={(e) => setAttr('desc', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default StarDesc;
