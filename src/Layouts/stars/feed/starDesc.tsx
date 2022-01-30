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
} from '@mui/material';
import { resources, severityColors } from '../../../assets/star';

interface starProps {
  star: IStar;
}

const StarDesc = ({ star }: starProps) => {
  const [resourceList, setResourceList] = useState<string[]>(star.resources);

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
          {star.name}
        </h1>
        <span>{star.version}</span>
      </div>
      <div className="starData">
        <div className="dataCol">
          <div className="dataRow">
            <Typography variant="caption" sx={{ padding: '7px 7px 7px 0' }}>
              הועלה על עדי
              {star.publisher}
              מתוך
              {star.event}
              {' '}
              {star.createdAt}
            </Typography>
          </div>
          <div className="dataRow">
            <TextField
              sx={{ margin: '7px', flexGrow: 1 }}
              label="גורם מטפל"
              defaultValue={star.assignee}
              variant="outlined"
            />
            <TextField
              sx={{ margin: '7px', flexGrow: 1 }}
              label="סטטוס"
              defaultValue={star.status}
              variant="outlined"
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: '90%' }}>
              <InputLabel id="resources">משאבים נדרשים</InputLabel>
              <Select
                labelId="resources"
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
            sx={{ display: 'grid', height: '123px', marginTop: '42px' }}
            label="תיאור"
            defaultValue={star.desc}
            variant="outlined"
            multiline
          />
        </div>
      </div>
    </div>
  );
};

export default StarDesc;
